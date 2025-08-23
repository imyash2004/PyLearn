---
title: "Loops - Repeating Actions Like Magic"
difficulty: "Beginner"
tags: ["loops", "repetition", "for", "while"]
---

# Loops - Repeating Actions Like Magic! 🔄

Imagine if you had to write "I will practice Python" 100 times by hand - that would take forever! Luckily, Python has something called **loops** that can repeat actions for us automatically.

## What are Loops?

A **loop** is like a magical repeat button for your code. Instead of writing the same thing over and over, you tell Python "do this thing multiple times" and it handles the rest!

Think of loops like:
- Brushing each tooth in your mouth
- Counting all your toys
- Saying "Are we there yet?" on a long car trip 😄

## For Loops: Counting Adventures

The **for loop** is perfect when you know how many times you want to repeat something.

\`\`\`python
# Print numbers 1 to 5
for number in range(1, 6):
    print(f"Count: {number}")
\`\`\`

This will print:
\`\`\`
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
\`\`\`

### Range Function Magic

The `range()` function is like a number generator:

\`\`\`python
# Count from 0 to 4
for i in range(5):
    print(f"Step {i}")

# Count from 2 to 8
for i in range(2, 9):
    print(f"Number {i}")

# Count by 2s: 0, 2, 4, 6, 8
for i in range(0, 10, 2):
    print(f"Even number: {i}")
\`\`\`

## Looping Through Lists

You can loop through lists of things too!

\`\`\`python
fruits = ["apple", "banana", "orange", "grape"]

for fruit in fruits:
    print(f"I love {fruit}s! 🍎")

# Or with animals
animals = ["cat", "dog", "elephant", "penguin"]

for animal in animals:
    print(f"The {animal} says hello!")
\`\`\`

## While Loops: Keep Going Until...

A **while loop** keeps repeating as long as something is true. It's like saying "keep doing this while this condition is still true."

\`\`\`python
countdown = 5

while countdown > 0:
    print(f"Countdown: {countdown}")
    countdown = countdown - 1

print("Blast off! 🚀")
\`\`\`

### Be Careful with While Loops!

Make sure your while loop will eventually stop, or it will run forever!

\`\`\`python
# Good - this will stop
energy = 10
while energy > 0:
    print("Running around!")
    energy = energy - 1
print("Time to rest!")

# Bad - this would never stop!
# while True:
#     print("This goes on forever!")
\`\`\`

## Fun Examples

### 1. Multiplication Table Helper

\`\`\`python
number = 7

print(f"Multiplication table for {number}:")
for i in range(1, 11):
    result = number * i
    print(f"{number} × {i} = {result}")
\`\`\`

### 2. Name Repeater

\`\`\`python
name = "Alex"
times = 3

for i in range(times):
    print(f"Hello, {name}! Welcome to Python! 👋")
\`\`\`

### 3. Guessing Game Counter

\`\`\`python
secret_number = 7
guess = 0
attempts = 0

while guess != secret_number and attempts < 3:
    guess = int(input("Guess my number (1-10): "))
    attempts = attempts + 1
    
    if guess == secret_number:
        print("You got it! 🎉")
    elif attempts < 3:
        print("Try again!")
    else:
        print(f"The number was {secret_number}!")
\`\`\`

## Loop Control: Break and Continue

Sometimes you want to exit a loop early or skip to the next round:

\`\`\`python
# Break - exit the loop completely
for number in range(1, 10):
    if number == 5:
        print("Found 5! Stopping here.")
        break
    print(number)

# Continue - skip to the next iteration
for number in range(1, 6):
    if number == 3:
        continue  # Skip 3
    print(f"Number: {number}")
\`\`\`

## Challenge Time! 🏆

Try creating these programs:

1. **Star Pattern**: Use a loop to print a triangle of stars:
   \`\`\`
   *
   **
   ***
   ****
   *****
   \`\`\`

2. **Sum Calculator**: Add up all numbers from 1 to 100 using a loop.

3. **Password Checker**: Keep asking for a password until the user enters the correct one.

4. **Shopping List**: Loop through a list of items and print "Don't forget to buy [item]!" for each one.

## Nested Loops: Loops Inside Loops!

You can put loops inside other loops - this is called nesting:

\`\`\`python
# Print a 3x3 grid of hearts
for row in range(3):
    for col in range(3):
        print("❤️", end=" ")
    print()  # New line after each row
\`\`\`

## Key Points to Remember

- **For loops** are great when you know how many times to repeat
- **While loops** are perfect when you want to repeat until something changes
- Always make sure while loops have a way to stop
- Use `range()` to generate sequences of numbers
- You can loop through lists, strings, and other collections
- `break` exits a loop, `continue` skips to the next iteration

## What's Next?

Awesome work learning about loops! You now know how to make your programs repeat actions efficiently. Next, we'll learn about functions - how to organize your code into reusable pieces that make programming even more powerful! 🎯

---

*Remember: Loops are like having a super-powered assistant that never gets tired of doing repetitive tasks!* 🤖
