## Localization

Localization, as you have probably guessed, is the process of locating oneself, usually in the confines of an environment. In the context of autonomous vehicles, localization is an extremely important step. It is what enables self driving cars to function properly and make proper turns, rather than crashing head first into a traffic signal or a tree or any other kind of obstacle that may be in its path.

As the name implies, to localize is to know where you are. Historically, Global Positioning Systems(GPS) has been used for this very purpose. However, as important and useful GPS is, it's simply not accurate enough to be useful in critical systems such as self driving cars. It is essential that a self driving car be accurate in its measurements and have confidence in that accuracy, or the alternative is tons of crashes and accidents.

GPS has upto 2-10 meters of error. That's not ideal, and the error needs to be better, in cm rather than meters That's the question that the localization process tries to answer. Let's get into the intution of how that actually happens, and then we'll implement a set of functions in `python` that are essentially how localization for self driving car works.

`> Important: The type of localization I'm writing about needs a good high definition map of the environment that the car is going to be operating in. Simultaneous Localization and Mapping(SLAM) is another type of localization that doesn't suffer from the same constraint`

## Intuition

Localization really is about continuous sensing and movement. You start out with a prior belief, which represents your view of what the environment looks like. On the basis of the belief, we sense the environment, update our belief based on the sensing results and make movements that correspond to the new information we learned from sensing. 

In a perfect world, robot motion would be exact. However, it hardly ever is. Sensing itself is not perfect, and there's always going to be some kind of error involved, either in your movements or in the precision of your sensing. But intuitively, accounting for imperfect sensing and motion, it follows that we gain information when we sense(that information may not be highly accurate, but it's a gain). And similarly, when we move with inexact motion, we lose information. That's what localization really is, a continuous cycle of sensing and movement. And the imperfectness of the motion and sensing is what makes it a hard problem to solve.

Let's try to understand, using code, these two processes.

## Sensing

Sensing takes in a belief(or a prior distribution) for the environment, and then updates that belief after sensing the environment. Say you have a bunch of buckets, either green or red in a uniform probability distribution. You go on and sense, say red buckets. It follows from probability theory that the belief for the red buckets should go up, and correspondingly the belief for the green buckets should go down. 

Let's implement this in code.

```python
#collapse-show
import random
n_buckets = 5
buckets = [random.choice(['green', 'red']) for _ in range(n_buckets)]
p = [1./n_buckets] * n_buckets # uniform probability distribution
print(buckets)
print(p)
```

```text
['red', 'red', 'green', 'green', 'green']
[0.2, 0.2, 0.2, 0.2, 0.2]
```

This defines the environment and our prior belief. Now, let's see what happens when we sense. Say we sense a red bucket. How does this affect my prior belief over different buckets?

The probabilities for the red buckets should go up, and the ones for green buckets should go down. Any bucket for which the color and our sensing is correct, we multipy it by a large weight, and a smaller weight for which it's incorrect.

```python
#collapse-show
pHit = 0.6 #for correct measurements
pMiss = 0.2 #for incorrect measurements

for i in range(n_buckets):
    if buckets[i] == 'green':
        p[i] *= pMiss
    else:
        p[i] *= pHit
print(p)
```

```text
[0.12, 0.12, 0.04000000000000001, 0.04000000000000001, 0.04000000000000001]
```

This represents our new distribution, also called a posterior probability distribution. However, as you can see it's not a valid probability distribution as it doesn't sum to 1. To fix that, we'll normalize it

```python
#collapse-show
s = sum(p)

for i in range(n_buckets):
    p[i] /= s
    
print(p)
```

```text
[0.3333333333333332, 0.3333333333333332, 0.1111111111111111, 0.1111111111111111, 0.1111111111111111]
```

As you can see, this is a valid distribution. This is what sensing does. If you compare our posterior distribution with our prior belief, we can see that we have more information and have a greater idea about the environment for the given task(namely sensing red buckets). This is the information gain described earlier. 

Let's refactor everything into one function.

```python
def sense(p, t):
    res = []
    for idx, _ in enumerate(p):
        hit = (buckets[idx] == t)
        res.append(p[idx] * (hit * pHit + (1-hit) * pMiss))
    s = sum(res)
    for i in range(len(res)):
        res[i] /= s
    return res

n_buckets = 5
buckets = [random.choice(['green', 'red']) for _ in range(n_buckets)]
p = [1./n_buckets] * n_buckets #prior
print(buckets)
print("Prior distribution is: {0}".format(p))
target = 'red'
p = sense(p, target) #posterior
print("Posterior distribution is: {0}".format(p))
```

```text
['red', 'red', 'green', 'green', 'red']
Prior distribution is: [0.2, 0.2, 0.2, 0.2, 0.2]
Posterior distribution is: [0.2727272727272727, 0.2727272727272727, 0.09090909090909091, 0.09090909090909091, 0.2727272727272727]
```

## Movement

Movement is the second part of the localization equation. We'll only deal with inexact motion, exact motion is a trivial case and a rare scenarior in real world performance.

Assuming the world is cyclic, that is the rightmost bucket wraps around as the new leftmost bucket as you move them around. Inexact motion exists when there is uncertainty about the accuracy of the motion of a robot.

Let's define the parameters for the inexact motion. Say the probabilties are as follows:
 - Exact Motion : $P(X_{i+t} \mid X_{i})$ = 0.8   
 - Undershooting: $P(X_{i+t-1} \mid X_{i})$ = 0.1 
 - Overshooting : $P(X_{i+t+1} \mid X_{i})$ = 0.1 
where t is the target

What this means is that we have an 80% chance of an exact motion and a 10% chance of either undershooting or overshooting our target. *Assume that overshooting or undershooting happens in incrmenents(decrements) of 1.*

Let's define inexact motion, accounting for the probabilities defined above.

`> Note: For uniform distributions, inexact motion has no effect on the posterior distribution. Uniform distributions are the state of least information. As everything is equally likely, we know nothing extra.`

```python
def move(p, unit):
    q = []
    for i in range(len(p)):
        s = pExact * p[(i-unit% len(p))]
        s += pOvershoot * p[(i+1-unit) % len(p)]
        s += pUndershoot * p[(i-1-unit) % len(p)]
        q.append(s)
    return q

pExact = 0.8
pOvershoot, pUndershoot = 0.1, 0.1
print("Environment is: {0}".format(buckets))
print("Prior distribution is: {0}".format(p))
print("Distribution after movement is: {0}".format(move(p, 1)))
```

```text
Environment is: ['red', 'red', 'green', 'green', 'red']
Prior distribution is: [0.2727272727272727, 0.2727272727272727, 0.09090909090909091, 0.09090909090909091, 0.2727272727272727]
Distribution after movement is: [0.2545454545454545, 0.2727272727272727, 0.2545454545454545, 0.1090909090909091, 0.1090909090909091]
```

It's not easily seen, but given our target is `red` buckets, the distribution after movements suggests that we now know less about the presence of red buckets in the environment. What would happen if we were to move again, say 2 times?

```python
#collapse-show
print("Prior distribution(after sensing) is: {0}".format(p))
for i in range(2):
    p = move(p, 1)
print("Posterior distribution(after movement) is: {0}".format(p))
```

```text
Prior distribution(after sensing) is: [0.2727272727272727, 0.2727272727272727, 0.09090909090909091, 0.09090909090909091, 0.2727272727272727]
Posterior distribution(after movement) is: [0.12363636363636364, 0.24181818181818182, 0.26909090909090905, 0.24181818181818182, 0.12363636363636364]
```

The uncertainty keeps increasing, and the amount of information gain keeps going down(wrt to the target). This is the entire localization loop, a continuous iteration of `sense` and `move`. You take an initial belief, use it to sense and then move accordingly. Every iteration of this loop(as we've just shown) cumulatively causes information loss, largely because of the inexact motion of robots. 

Every time we `sense`, the probability distribution is more focused *ie.* it learns more and after every iteration of `move`, the distribution is a bit more spread out because of information loss.

## Formalizing Localization

We looked at a very simple example above. While it may not look like we've implemented localization, it does implement the essence of how localization works. In the real world, the green and red buckets would be substituted by lane markers, trees, signposts *etc*. And the measurements obtained from sensing(say a camera) would be the color of those individual objects. This same approach can be used to work on image data, as long as we can make the proper associations.

### Sensing

$P(X \mid Z) = \frac {P(Z \mid X) * P(X)}{P(Z)}$

The above equation defines the Bayes rule, which incorporates prior knowledge to find the probability of an event occuring.

In terms of measurements(sensing), consider X to be one of the grids in a map and Z to be the measurement update. So, the equation described above intends to calculate the probability of the location after taking the measurement into consideration

Here, $P(X)$ is the prior distribution and $P(X \mid Z) is the probability of a colored bucket for every possible location in the environment. The product of these will correspond to the non-normalized probability distribution from earlier.

It then follows that $P(Z)$ is the sum of such probability distributions, over all grid cells in the environment leading to a normalized posterior distribution. What $P(Z)$ is really doing is assigning each cell a probability, irrespective of which cell it is.

Referenced from the Localization module in the Udacity Self Driving Cars Nanodegree program
