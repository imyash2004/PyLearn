---
title: "Variables and Data"
difficulty: "beginner"
tags: ["variables", "data types", "basics"]
---

# Variables and Data 📦

Welcome back, Python explorer! Today we're going to learn about **variables** - one of the most important concepts in programming.

## What are Variables?

Think of variables like **labeled boxes** where you can store different things. Just like you might have a box labeled "Toys" or "Books" in your room, variables have names and hold different types of information.

\`\`\`python
# Creating variables is like labeling boxes
name = "Emma"
age = 12
favorite_color = "purple"
\`\`\`

## Creating Your First Variables

Let's create some variables together:

\`\`\`python
# Store your name
my_name = "Alex"

# Store your age
my_age = 10

# Store your favorite animal
favorite_animal = "dolphin"

# Now let's use them!
print("Hi, my name is " + my_name)
print("I am " + str(my_age) + " years old")
print("My favorite animal is a " + favorite_animal)
\`\`\`

### 🎯 Try It Yourself!
Change the values above to match your own information and run the code!

## Types of Data

Python can store different **types** of data in variables. Let's explore the main ones:

### 1. Text (Strings) 📝
Text in Python is called a **string**. You put strings inside quotes:

\`\`\`python
first_name = "Maya"
last_name = "Johnson"
favorite_book = "Harry Potter"
message = "Python is awesome!"

# You can use single or double quotes
pet_name = 'Fluffy'
school = "Riverside Elementary"
\`\`\`

### 2. Numbers (Integers) 🔢
Whole numbers are called **integers**:

\`\`\`python
my_age = 11
number_of_pets = 2
favorite_number = 7
year = 2024
\`\`\`

### 3. Decimal Numbers (Floats) 🔢.🔢
Numbers with decimal points are called **floats**:

\`\`\`python
height = 4.5  # feet
temperature = 72.3  # degrees
price = 12.99  # dollars
pi = 3.14159
\`\`\`

### 4. True or False (Booleans) ✅❌
These can only be `True` or `False`:

\`\`\`python
is_sunny = True
is_raining = False
likes_pizza = True
finished_homework = False
\`\`\`

## Fun with Variables

### Changing Variables
Variables can change! That's why they're called "variables":

\`\`\`python
score = 0
print("Starting score:", score)

score = 10
print("After first level:", score)

score = 25
print("After second level:", score)
\`\`\`

### Math with Variables
You can do math with number variables:

\`\`\`python
apples = 5
oranges = 3

total_fruit = apples + oranges
print("Total fruit:", total_fruit)  # Shows: 8

# More math operations
difference = apples - oranges  # 2
product = apples * oranges     # 15
division = apples / oranges    # 1.67 (approximately)
\`\`\`

### Combining Text
You can combine (concatenate) strings:

\`\`\`python
first_name = "Sarah"
last_name = "Wilson"

# Method 1: Using +
full_name = first_name + " " + last_name
print(full_name)  # Shows: Sarah Wilson

# Method 2: Using f-strings (super cool!)
greeting = f"Hello, {first_name}! Welcome to Python!"
print(greeting)
\`\`\`

## Variable Naming Rules 📋

Python has some rules for naming variables:

### ✅ Good Variable Names:
\`\`\`python
student_name = "Alex"
favorite_color = "blue"
number_of_books = 15
is_happy = True
age2024 = 12
\`\`\`

### ❌ Bad Variable Names:
\`\`\`python
# These won't work!
2age = 12        # Can't start with a number
my-name = "Sam"  # Can't use hyphens
class = "Math"   # Can't use Python keywords
\`\`\`

### 🌟 Best Practices:
- Use descriptive names: `student_age` instead of `a`
- Use lowercase with underscores: `favorite_food`
- Make it clear what the variable stores

## Interactive Examples

### Example 1: Personal Information Card
\`\`\`python
# Create your personal info card
name = "Jordan"
age = 13
grade = 7
hobby = "drawing"
favorite_subject = "science"

print("=" * 30)
print("STUDENT INFORMATION CARD")
print("=" * 30)
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Grade: {grade}")
print(f"Hobby: {hobby}")
print(f"Favorite Subject: {favorite_subject}")
print("=" * 30)
\`\`\`

### Example 2: Simple Calculator
\`\`\`python
# Let's do some math!
num1 = 15
num2 = 7

sum_result = num1 + num2
difference = num1 - num2
product = num1 * num2

print(f"{num1} + {num2} = {sum_result}")
print(f"{num1} - {num2} = {difference}")
print(f"{num1} × {num2} = {product}")
\`\`\`

### Example 3: Story Generator
\`\`\`python
# Create a fun story with variables
character = "brave knight"
place = "enchanted forest"
object = "magical sword"
adjective = "glowing"

story = f"Once upon a time, a {character} entered the {place}. "
story = story + f"There, they found a {adjective} {object} that would help save the kingdom!"

print(story)
\`\`\`

## Practice Challenges 🎯

### Challenge 1: About Me
Create variables for:
- Your name
- Your age
- Your favorite color
- Your favorite food
- Whether you like Python (True/False)

Then print them all in a nice format!

### Challenge 2: Pet Information
Create variables for a pet (real or imaginary):
- Pet's name
- Pet's type (dog, cat, hamster, etc.)
- Pet's age
- Is the pet friendly? (True/False)

### Challenge 3: Simple Math Quiz
Create two number variables and calculate:
- Their sum
- Their difference
- Their product
- Which number is larger?

## Common Mistakes to Avoid ⚠️

### 1. Forgetting Quotes for Text
\`\`\`python
# Wrong:
name = Alex  # This will cause an error!

# Right:
name = "Alex"
\`\`\`

### 2. Mixing Up Data Types
\`\`\`python
# This might not work as expected:
age = "12"  # This is text, not a number!
next_year = age + 1  # Error!

# Better:
age = 12  # This is a number
next_year = age + 1  # This works!
\`\`\`

## What's Next?

Fantastic work! You now know how to:
- Create variables to store information
- Work with different types of data (text, numbers, True/False)
- Use variables in calculations and text combinations
- Follow Python's naming rules

In our next lesson, we'll dive deeper into working with **text (strings)** and learn some amazing tricks for manipulating words and sentences!

## Fun Fact! 🤓

The word "variable" comes from mathematics, where letters like `x` and `y` represent unknown values. In programming, variables are like those letters, but we can give them much more descriptive names like `student_name` or `favorite_pizza_topping`!

Keep practicing, and remember: every expert programmer started exactly where you are now! 🚀
