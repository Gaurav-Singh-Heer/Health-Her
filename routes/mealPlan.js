const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const User = require('../models/User');
const { getMealPlan } = require('../utils');
const router = express.Router();

// GET meal plan for authenticated user
router.get('/', isAuthenticated, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { activeness, diet } = user;
        const age = user.calculateAge();
        const mealPlan = await getMealPlan(age, activeness, diet);

        const smoothieDetails = {
            "vegetarian": {
                "Breakfast Smoothies": {
                    "Banana Smoothie": { image: "Banana-Coffee-Caramel.jpg", energy: "180 kcal", carbohydrates: "30g", proteins: "4g", fats: "5g", fiber: "6g", ingredients: ["400 g Bananas", "200 ml strong coffee, cooled", "600 ml milk", "2-4 tbsp caramel sauce, to taste"], instructions: "Peel and chop the bananas.Put all of the ingredients into the soup maker, close the lid and select the smoothie option.When the smoothie is ready, open the lid and serve in tall glasses with a straw. Finish with an extra drizzle of caramel sauce if you like." },
                    "Apple Smoothie": { image: "Apple-smoothie.jpg", energy: "190 kcal", carbohydrates: "32g", proteins: "5g", fats: "6g", fiber: "5g", ingredients: ["1 green apple, peeled, diced and frozen", "100 g raspberries", "150 ml ice-cold buttermilk"], instructions: "Put the apple and the buttermilk in the blender and use the SMOOTHIE button for at least 1 minute to mix until well-blended.Pour into tall glasses, mash the raspberries and spoon them through the apple smoothie. Spectacularly good. 5 minutes preparation time" },
                    "Raspberry Buttermilk Smoothie": { image: "Raspberry-Buttermilk-Smoothie.jpg", energy: "190 kcal", carbohydrates: "32g", proteins: "5g", fats: "6g", fiber: "5g", ingredients: ["500 g fresh raspberries", "200 ml sparkling water", "500 ml buttermilk"], instructions: "Place all of the ingredients into the soup maker, close the lid and select the smoothie option.When the smoothie is ready, open the lid and serve in tall glass with a straw." },
                    "Fruit and Oat Smoothie": { image: "smoothie-oat-receipe.jpg", energy: "190 kcal", carbohydrates: "32g", proteins: "5g", fats: "6g", fiber: "5g", ingredients: ["166 g (1 c) sliced strawberries", "48 g ( 1/2 c) old-fashioned oats", "1 sliced banana", "190 g (3/4 c) low-fat vanilla yogurt", "120 mL (1/2 c) unsweetened almond milk","1 tsp maple syrup"], instructions: "Place ingredients in beaker. Blend using the blender bar. Enjoy!" }
                },
                "Post-workout Smoothies": {
                    "Peach and Pineapple": { image: "peachand-pineapple-smoothie-thumb.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["Pineapple (peeled, cut into cubes) 600g", "Honey 20g", "Peach (peeled, cut into cubes) 100g", "Ice cubes 180g","Milk/cold drinking water 50ml","Mint leaf 2 pcs"], instructions: "Except the mint leaves, put all the ingredients into the blender, close the lid. Select Smoothie, press start. When finished, garnish with mint leave and serve." },
                    "Blueberry Smoothie": { image: "BlueBerry-Smoothie.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["165g blueberries", "220ml low-fat yogurt", "½ banana"], instructions: "Mix all ingredients in the blender until they are evenly pureed. You can also add 45g of strawberries to the smoothie for extra vitamin C." },
                    "Beetroot and Carrot Juice": { image: "beetroot-and-carrot-juice.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 beetroots", "1 tablespoon of lime juice", "2 tablespoons of yoghurt"], instructions: "Peel the beetroot and the carrot. Cut into chunks and place in the juicer (speed 2).Add lime juice to taste, and season with salt and freshly ground pepper. Serve with 2 tablespoons of runny yoghurt and a long spoon. Carefully stir in the yoghurt." },
                    "Banana and Milkshake": { image: "banana-and-honey-milkshake.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["1 banana, sliced and frozen", "1 teaspoon honey", "150 ml icecold milk", "pinch of cinnamon"], instructions: "Put all of the ingredients together in the blender and use the SMOOTHIE button for at least 1 minute to mix them into a silky foaming drink. 5 minutes preparation time" }
                },
                "Weight Loss": {
                    "Green Spinach": { image: "Green-Spinach.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["0.5 Banana", "1 Carrot", "0.5 Mango", "0.25 Pineapple","30g Spinach","50 ml Water"], instructions: "Cut the peeled carrot, pineapple, mango and banana into small chunks. Add all the ingredients to the blender and blend it until smooth. Enjoy your Green spinach and carrot smoothie!" },
                    "Orange Smoothie": { image: "Orange-Smoothie.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 medium-sized oranges", "1 Banana", "75ml low-fat Greek yoghurt", "Sweetener, such as honey, or agave syrup to taste", "Ice cubes (if needed)"], instructions: "Starting with the oranges, add all ingredients (except the sweetener) to a blender. Puree until smooth. If necessary, sweeten with stevia, honey, or agave syrup." },
                    "Posh Pear": { image: "posh-pear.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["200 g white grapes", "1 cucumber", "2 pears"], instructions: "Juice 200 g white grapes (washed) in the juicer with 2 pears (washed, unpeeled, quartered) and 1 cucumber (washed, unpeeled). Stir and serve immediately. 5 minutes preparation time" },
                    "Cucumber and Lemon Juice": { image: "cucumber-and--lemon-juice.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 sprigs of fresh mint", "1.5 cucumber", "1/2 lemon", "50-100 ml sparkling mineral water"], instructions: "Place a mint leaf in each section of an ice cube tray, carefully add water and freeze. Peel the cucumber and cut into chunks. Remove the lemon peel, making sure to remove the white part of the peel as well. Place in the juicer (speed 1). Add sparkling mineral water to the juice for an extra-fresh taste. Serve with the mint ice cubes." }
                },
                "Diabetic-Friendly": {
                    "Blackberry Smoothie": { image: "BlackBerry.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["165g blueberries", "220ml low-fat yogurt", "½ banana"], instructions: "Mix all ingredients in the blender until they are evenly pureed. You can also add 45g of strawberries to the smoothie for extra vitamin C." },
                    "Avocado Smoothie": { image: "Avoocado-Smoothie.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["1 ripe avocado", "1.5 cups of low-fat milk", "1.5 tbsp. fresh lemon juice", "1 tbsp. of agave syrup or honey","1 tbsp. of fresh chopped basil"], instructions: "Put the flesh of the avocado in a blender and add milk, lemon juice and basil. Blend until everything is finely pureed." },
                    "Pineapple and Coriander Juice": { image: "PineApple-and-Coriander.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["1 pineapple", "2 tablespoons coriander leaves", "thin slice of ginger", "pinch of salt"], instructions: "Peel the pineapple, remove the core and dice the fruit. Add all the ingredients to the blender and blend on MAX for at least 1 minute. Serve chilled for a tasty juice. For clear juice strain to remove the pulp (unfortunately losing all the fibres in the process). 5 minutes preparation time" },
                    "Cucumber and Lemon Juice": { image: "cucumber-and--lemon-juice.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 sprigs of fresh mint", "1.5 cucumber", "1/2 lemon", "50-100 ml sparkling mineral water"], instructions: "Place a mint leaf in each section of an ice cube tray, carefully add water and freeze. Peel the cucumber and cut into chunks. Remove the lemon peel, making sure to remove the white part of the peel as well. Place in the juicer (speed 1). Add sparkling mineral water to the juice for an extra-fresh taste. Serve with the mint ice cubes." }
                }
            },
            "vegan": {
                "Breakfast Smoothies": {
                    "Vegan Strawberry Smoothie": { image: "BlackBerry.jpg", energy: "180 kcal", carbohydrates: "30g", proteins: "4g", fats: "5g", fiber: "6g", ingredients: ["Berries", "Spinach", "Banana", "Almond Milk"], instructions: "Blend all ingredients until smooth. Serve chilled." },
                    "Banana Smoothie": { image: "Banana-Coffee-Caramel.jpg", energy: "180 kcal", carbohydrates: "30g", proteins: "4g", fats: "5g", fiber: "6g", ingredients: ["400 g Bananas", "200 ml strong coffee, cooled", "600 ml milk", "2-4 tbsp caramel sauce, to taste"], instructions: "Peel and chop the bananas.Put all of the ingredients into the soup maker, close the lid and select the smoothie option.When the smoothie is ready, open the lid and serve in tall glasses with a straw. Finish with an extra drizzle of caramel sauce if you like." },
                    "Butternut Smoothie": { image: "revital.jpg", energy: "190 kcal", carbohydrates: "32g", proteins: "5g", fats: "6g", fiber: "5g", ingredients: ["Mango", "Yogurt", "Honey", "Chia Seeds"], instructions: "Blend well and enjoy fresh." },
                    "Fruit and Oat Smoothie": { image: "smoothie-oat-receipe.jpg", energy: "190 kcal", carbohydrates: "32g", proteins: "5g", fats: "6g", fiber: "5g", ingredients: ["166 g (1 c) sliced strawberries", "48 g ( 1/2 c) old-fashioned oats", "1 sliced banana", "190 g (3/4 c) low-fat vanilla yogurt", "120 mL (1/2 c) unsweetened almond milk","1 tsp maple syrup"], instructions: "Place ingredients in beaker. Blend using the blender bar. Enjoy!" }
                },
                "Post-workout Smoothies": {
                    "Blueberry Smoothie": { image: "BlueBerry-Smoothie.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["165g blueberries", "220ml low-fat yogurt", "½ banana"], instructions: "Mix all ingredients in the blender until they are evenly pureed. You can also add 45g of strawberries to the smoothie for extra vitamin C." },
                    "Beetroot and Carrot Juice": { image: "beetroot-and-carrot-juice.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 beetroots", "1 tablespoon of lime juice", "2 tablespoons of yoghurt"], instructions: "Peel the beetroot and the carrot. Cut into chunks and place in the juicer (speed 2).Add lime juice to taste, and season with salt and freshly ground pepper. Serve with 2 tablespoons of runny yoghurt and a long spoon. Carefully stir in the yoghurt." },
                    "Pineapple and Coriander Juice": { image: "PineApple-and-Coriander.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["1 pineapple", "2 tablespoons coriander leaves", "thin slice of ginger", "pinch of salt"], instructions: "Peel the pineapple, remove the core and dice the fruit. Add all the ingredients to the blender and blend on MAX for at least 1 minute. Serve chilled for a tasty juice. For clear juice strain to remove the pulp (unfortunately losing all the fibres in the process). 5 minutes preparation time" },
                },
                "Weight Loss": {
                    "Green Spinach": { image: "Green-Spinach.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["0.5 Banana", "1 Carrot", "0.5 Mango", "0.25 Pineapple","30g Spinach","50 ml Water"], instructions: "Cut the peeled carrot, pineapple, mango and banana into small chunks. Add all the ingredients to the blender and blend it until smooth. Enjoy your Green spinach and carrot smoothie!" },
                    "Cucumber and Lemon Juice": { image: "cucumber-and--lemon-juice.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 sprigs of fresh mint", "1.5 cucumber", "1/2 lemon", "50-100 ml sparkling mineral water"], instructions: "Place a mint leaf in each section of an ice cube tray, carefully add water and freeze. Peel the cucumber and cut into chunks. Remove the lemon peel, making sure to remove the white part of the peel as well. Place in the juicer (speed 1). Add sparkling mineral water to the juice for an extra-fresh taste. Serve with the mint ice cubes." },
                    "Posh Pear": { image: "posh-pear.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["200 g white grapes", "1 cucumber", "2 pears"], instructions: "Juice 200 g white grapes (washed) in the juicer with 2 pears (washed, unpeeled, quartered) and 1 cucumber (washed, unpeeled). Stir and serve immediately. 5 minutes preparation time" },
                },
                "Diabetic-Friendly": {
                    "Blackberry Smoothie": { image: "BlackBerry.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["165g blueberries", "220ml low-fat yogurt", "½ banana"], instructions: "Mix all ingredients in the blender until they are evenly pureed. You can also add 45g of strawberries to the smoothie for extra vitamin C." },
                    "Avocado Smoothie": { image: "Avoocado-Smoothie.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["1 ripe avocado", "1.5 cups of low-fat milk", "1.5 tbsp. fresh lemon juice", "1 tbsp. of agave syrup or honey","1 tbsp. of fresh chopped basil"], instructions: "Put the flesh of the avocado in a blender and add milk, lemon juice and basil. Blend until everything is finely pureed." },
                    "Posh Pear": { image: "posh-pear.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["200 g white grapes", "1 cucumber", "2 pears"], instructions: "Juice 200 g white grapes (washed) in the juicer with 2 pears (washed, unpeeled, quartered) and 1 cucumber (washed, unpeeled). Stir and serve immediately. 5 minutes preparation time" },
                    "Cucumber and Lemon Juice": { image: "cucumber-and--lemon-juice.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 sprigs of fresh mint", "1.5 cucumber", "1/2 lemon", "50-100 ml sparkling mineral water"], instructions: "Place a mint leaf in each section of an ice cube tray, carefully add water and freeze. Peel the cucumber and cut into chunks. Remove the lemon peel, making sure to remove the white part of the peel as well. Place in the juicer (speed 1). Add sparkling mineral water to the juice for an extra-fresh taste. Serve with the mint ice cubes." }
                }
            },
            "whole30": {
                "Breakfast Smoothies": {
                    "Green Smoothie": { image: "rootberry.jpg", energy: "180 kcal", carbohydrates: "30g", proteins: "4g", fats: "5g", fiber: "6g", ingredients: ["Berries", "Spinach", "Banana", "Almond Milk"], instructions: "Blend all ingredients until smooth. Serve chilled." },
                    "Apple Smoothie": { image: "Apple-smoothie.jpg", energy: "190 kcal", carbohydrates: "32g", proteins: "5g", fats: "6g", fiber: "5g", ingredients: ["1 green apple, peeled, diced and frozen", "100 g raspberries", "150 ml ice-cold buttermilk"], instructions: "Put the apple and the buttermilk in the blender and use the SMOOTHIE button for at least 1 minute to mix until well-blended.Pour into tall glasses, mash the raspberries and spoon them through the apple smoothie. Spectacularly good. 5 minutes preparation time" },
                    "Fruit and Oat Smoothie": { image: "smoothie-oat-receipe.jpg", energy: "190 kcal", carbohydrates: "32g", proteins: "5g", fats: "6g", fiber: "5g", ingredients: ["166 g (1 c) sliced strawberries", "48 g ( 1/2 c) old-fashioned oats", "1 sliced banana", "190 g (3/4 c) low-fat vanilla yogurt", "120 mL (1/2 c) unsweetened almond milk","1 tsp maple syrup"], instructions: "Place ingredients in beaker. Blend using the blender bar. Enjoy!" },
                    "Apricot Smoothie": { image: "revital.jpg", energy: "190 kcal", carbohydrates: "32g", proteins: "5g", fats: "6g", fiber: "5g", ingredients: ["Mango", "Yogurt", "Honey", "Chia Seeds"], instructions: "Blend well and enjoy fresh." }
                },
                "Post-workout Smoothies": {
                    "Peach and Pineapple": { image: "peachand-pineapple-smoothie-thumb.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["Pineapple (peeled, cut into cubes) 600g", "Honey 20g", "Peach (peeled, cut into cubes) 100g", "Ice cubes 180g","Milk/cold drinking water 50ml","Mint leaf 2 pcs"], instructions: "Except the mint leaves, put all the ingredients into the blender, close the lid. Select Smoothie, press start. When finished, garnish with mint leave and serve." },
                    "Blueberry Smoothie": { image: "BlueBerry-Smoothie.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["165g blueberries", "220ml low-fat yogurt", "½ banana"], instructions: "Mix all ingredients in the blender until they are evenly pureed. You can also add 45g of strawberries to the smoothie for extra vitamin C." },
                    "Beetroot and Carrot Juice": { image: "beetroot-and-carrot-juice.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 beetroots", "1 tablespoon of lime juice", "2 tablespoons of yoghurt"], instructions: "Peel the beetroot and the carrot. Cut into chunks and place in the juicer (speed 2).Add lime juice to taste, and season with salt and freshly ground pepper. Serve with 2 tablespoons of runny yoghurt and a long spoon. Carefully stir in the yoghurt." },
                    "Pineapple and Coriander Juice": { image: "PineApple-and-Coriander.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["1 pineapple", "2 tablespoons coriander leaves", "thin slice of ginger", "pinch of salt"], instructions: "Peel the pineapple, remove the core and dice the fruit. Add all the ingredients to the blender and blend on MAX for at least 1 minute. Serve chilled for a tasty juice. For clear juice strain to remove the pulp (unfortunately losing all the fibres in the process). 5 minutes preparation time" },
                },
                "Weight Loss Smoothies": {
                    "Green Spinach": { image: "Green-Spinach.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["0.5 Banana", "1 Carrot", "0.5 Mango", "0.25 Pineapple","30g Spinach","50 ml Water"], instructions: "Cut the peeled carrot, pineapple, mango and banana into small chunks. Add all the ingredients to the blender and blend it until smooth. Enjoy your Green spinach and carrot smoothie!" },
                    "Cucumber and Lemon Juice": { image: "cucumber-and--lemon-juice.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 sprigs of fresh mint", "1.5 cucumber", "1/2 lemon", "50-100 ml sparkling mineral water"], instructions: "Place a mint leaf in each section of an ice cube tray, carefully add water and freeze. Peel the cucumber and cut into chunks. Remove the lemon peel, making sure to remove the white part of the peel as well. Place in the juicer (speed 1). Add sparkling mineral water to the juice for an extra-fresh taste. Serve with the mint ice cubes." },
                    "Posh Pear": { image: "posh-pear.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["200 g white grapes", "1 cucumber", "2 pears"], instructions: "Juice 200 g white grapes (washed) in the juicer with 2 pears (washed, unpeeled, quartered) and 1 cucumber (washed, unpeeled). Stir and serve immediately. 5 minutes preparation time" },
                },
                "Diabetic-Friendly": {
                    "Blackberry Smoothie": { image: "BlackBerry.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["165g blueberries", "220ml low-fat yogurt", "½ banana"], instructions: "Mix all ingredients in the blender until they are evenly pureed. You can also add 45g of strawberries to the smoothie for extra vitamin C." },
                    "Avocado Smoothie": { image: "Avoocado-Smoothie.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["1 ripe avocado", "1.5 cups of low-fat milk", "1.5 tbsp. fresh lemon juice", "1 tbsp. of agave syrup or honey","1 tbsp. of fresh chopped basil"], instructions: "Put the flesh of the avocado in a blender and add milk, lemon juice and basil. Blend until everything is finely pureed." },
                    "Posh Pear": { image: "posh-pear.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["200 g white grapes", "1 cucumber", "2 pears"], instructions: "Juice 200 g white grapes (washed) in the juicer with 2 pears (washed, unpeeled, quartered) and 1 cucumber (washed, unpeeled). Stir and serve immediately. 5 minutes preparation time" },
                    "Cucumber and Lemon Juice": { image: "cucumber-and--lemon-juice.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 sprigs of fresh mint", "1.5 cucumber", "1/2 lemon", "50-100 ml sparkling mineral water"], instructions: "Place a mint leaf in each section of an ice cube tray, carefully add water and freeze. Peel the cucumber and cut into chunks. Remove the lemon peel, making sure to remove the white part of the peel as well. Place in the juicer (speed 1). Add sparkling mineral water to the juice for an extra-fresh taste. Serve with the mint ice cubes." }
                }
            },
            "pescetarian": {
                "Breakfast Smoothies": {
                    "Banana Coffee Caramel": { image: "rootberry.jpg", energy: "180 kcal", carbohydrates: "30g", proteins: "4g", fats: "5g", fiber: "6g", ingredients: ["Berries", "Spinach", "Banana", "Almond Milk"], instructions: "Blend all ingredients until smooth. Serve chilled." },
                    "Raspberry Buttermilk Smoothie": { image: "Raspberry-Buttermilk-Smoothie.jpg", energy: "190 kcal", carbohydrates: "32g", proteins: "5g", fats: "6g", fiber: "5g", ingredients: ["500 g fresh raspberries", "200 ml sparkling water", "500 ml buttermilk"], instructions: "Place all of the ingredients into the soup maker, close the lid and select the smoothie option.When the smoothie is ready, open the lid and serve in tall glass with a straw." },
                    "Strawberry Blueberry Smoothie": { image: "revital.jpg", energy: "190 kcal", carbohydrates: "32g", proteins: "5g", fats: "6g", fiber: "5g", ingredients: ["Mango", "Yogurt", "Honey", "Chia Seeds"], instructions: "Blend well and enjoy fresh." },
                    "Banana and Milkshake": { image: "banana-and-honey-milkshake.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["1 banana, sliced and frozen", "1 teaspoon honey", "150 ml icecold milk", "pinch of cinnamon"], instructions: "Put all of the ingredients together in the blender and use the SMOOTHIE button for at least 1 minute to mix them into a silky foaming drink. 5 minutes preparation time" }
                },
                "Post-workout Smoothies": {
                    "Blueberry Smoothie": { image: "BlueBerry-Smoothie.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["165g blueberries", "220ml low-fat yogurt", "½ banana"], instructions: "Mix all ingredients in the blender until they are evenly pureed. You can also add 45g of strawberries to the smoothie for extra vitamin C." },
                    "Pineapple and Coriander Juice": { image: "PineApple-and-Coriander.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["1 pineapple", "2 tablespoons coriander leaves", "thin slice of ginger", "pinch of salt"], instructions: "Peel the pineapple, remove the core and dice the fruit. Add all the ingredients to the blender and blend on MAX for at least 1 minute. Serve chilled for a tasty juice. For clear juice strain to remove the pulp (unfortunately losing all the fibres in the process). 5 minutes preparation time" },
                    "Peach and Pineapple": { image: "peachand-pineapple-smoothie-thumb.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["Pineapple (peeled, cut into cubes) 600g", "Honey 20g", "Peach (peeled, cut into cubes) 100g", "Ice cubes 180g","Milk/cold drinking water 50ml","Mint leaf 2 pcs"], instructions: "Except the mint leaves, put all the ingredients into the blender, close the lid. Select Smoothie, press start. When finished, garnish with mint leave and serve." },
                },
                "Weight Loss Smoothies": {
                    "Green Spinach": { image: "Green-Spinach.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["0.5 Banana", "1 Carrot", "0.5 Mango", "0.25 Pineapple","30g Spinach","50 ml Water"], instructions: "Cut the peeled carrot, pineapple, mango and banana into small chunks. Add all the ingredients to the blender and blend it until smooth. Enjoy your Green spinach and carrot smoothie!" },
                    "Cucumber and Lemon Juice": { image: "cucumber-and--lemon-juice.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 sprigs of fresh mint", "1.5 cucumber", "1/2 lemon", "50-100 ml sparkling mineral water"], instructions: "Place a mint leaf in each section of an ice cube tray, carefully add water and freeze. Peel the cucumber and cut into chunks. Remove the lemon peel, making sure to remove the white part of the peel as well. Place in the juicer (speed 1). Add sparkling mineral water to the juice for an extra-fresh taste. Serve with the mint ice cubes." },
                },
                "Diabetic-Friendly": {
                    "Blackberry Smoothie": { image: "BlackBerry.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["165g blueberries", "220ml low-fat yogurt", "½ banana"], instructions: "Mix all ingredients in the blender until they are evenly pureed. You can also add 45g of strawberries to the smoothie for extra vitamin C." },
                    "Avocado Smoothie": { image: "Avoocado-Smoothie.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["1 ripe avocado", "1.5 cups of low-fat milk", "1.5 tbsp. fresh lemon juice", "1 tbsp. of agave syrup or honey","1 tbsp. of fresh chopped basil"], instructions: "Put the flesh of the avocado in a blender and add milk, lemon juice and basil. Blend until everything is finely pureed." },
                    "Posh Pear": { image: "posh-pear.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["200 g white grapes", "1 cucumber", "2 pears"], instructions: "Juice 200 g white grapes (washed) in the juicer with 2 pears (washed, unpeeled, quartered) and 1 cucumber (washed, unpeeled). Stir and serve immediately. 5 minutes preparation time" },
                    "Beetroot and Carrot Juice": { image: "beetroot-and-carrot-juice.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["2 beetroots", "1 tablespoon of lime juice", "2 tablespoons of yoghurt"], instructions: "Peel the beetroot and the carrot. Cut into chunks and place in the juicer (speed 2).Add lime juice to taste, and season with salt and freshly ground pepper. Serve with 2 tablespoons of runny yoghurt and a long spoon. Carefully stir in the yoghurt." },
                }
            }
        };

        return res.render('mealPlan', { mealPlan, diet, smoothieDetails });
    } catch (err) {
        next(err);
    }
});

// POST request to generate meal plan based on user input
router.post('/user/mealplan', async (req, res, next) => {
    try {
        const { diet, age, activeness } = req.body;
        if (!diet || !age || !activeness) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const mealPlan = await getMealPlan(age, activeness, diet);

        const smoothieDetails = {
            "Vegetarian": {
                "Breakfast Smoothies": {
                    "Rootberry Smoothie": { image: "rootberry.jpg", energy: "180 kcal", carbohydrates: "30g", proteins: "4g", fats: "5g", fiber: "6g", ingredients: ["Berries", "Spinach", "Banana", "Almond Milk"], instructions: "Blend all ingredients until smooth. Serve chilled." },
                    "Revital Smoothie": { image: "revital.jpg", energy: "190 kcal", carbohydrates: "32g", proteins: "5g", fats: "6g", fiber: "5g", ingredients: ["Mango", "Yogurt", "Honey", "Chia Seeds"], instructions: "Blend well and enjoy fresh." }
                },
                "Post-workout Smoothies": {
                    "Nuts and Cream Smoothie": { image: "nutscream.jpg", energy: "250 kcal", carbohydrates: "20g", proteins: "10g", fats: "12g", fiber: "4g", ingredients: ["Almonds", "Banana", "Greek Yogurt", "Milk"], instructions: "Blend all together and serve." }
                }
            },
            "Vegan": {
                "Breakfast Smoothies": {
                    "Cucumberry Smoothie": { image: "cucumberry.jpg", energy: "170 kcal", carbohydrates: "28g", proteins: "3g", fats: "4g", fiber: "6g", ingredients: ["Cucumber", "Berries", "Almond Milk", "Mint"], instructions: "Blend until smooth and serve chilled." }
                }
            },
            "Whole30": {
                "Weight Loss Smoothies": {
                    "Green Giant Smoothie": { image: "greengiant.jpg", energy: "190 kcal", carbohydrates: "26g", proteins: "5g", fats: "4g", fiber: "7g", ingredients: ["Spinach", "Avocado", "Coconut Water", "Flax Seeds"], instructions: "Blend all ingredients until smooth." }
                }
            },
            "Pescetarian": {
                "Breakfast Smoothies": {
                    "Cucumberry Smoothie": { image: "cucumberry.jpg", energy: "170 kcal", carbohydrates: "28g", proteins: "3g", fats: "4g", fiber: "6g", ingredients: ["Cucumber", "Berries", "Almond Milk", "Mint"], instructions: "Blend until smooth and serve chilled." }
                }
            }
        };

        return res.render('mealPlan', { mealPlan, diet, smoothieDetails });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
