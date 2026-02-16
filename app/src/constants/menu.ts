import { MenuItem, MenuCategory, BYOOptions } from '../types';

export const HOT_FOODS: MenuItem[] = [
  { id: 'hf-1', name: 'Baked Chicken' },
  { id: 'hf-2', name: 'BBQ Ribs' },
  { id: 'hf-3', name: 'Boneless Pork Chops' },
  { id: 'hf-4', name: 'Bratwurst & Kraut' },
  { id: 'hf-5', name: 'Baked Ziti' },
  { id: 'hf-6', name: 'Beef Goulash' },
  { id: 'hf-7', name: 'Beef Stew' },
  { id: 'hf-8', name: 'Calamari' },
  { id: 'hf-9', name: 'Chicken Cordon Bleu' },
  { id: 'hf-10', name: 'Chicken Piccata' },
  { id: 'hf-11', name: 'Chicken Dijon' },
  { id: 'hf-12', name: 'Chicken Paprikash' },
  { id: 'hf-13', name: 'Chicken Marsala' },
  { id: 'hf-14', name: 'Chicken Francaise' },
  { id: 'hf-15', name: 'Chicken Parmesan' },
  { id: 'hf-16', name: 'Flank Steak' },
  { id: 'hf-17', name: 'Flounder Fillet' },
  { id: 'hf-18', name: 'Stuffed Flounder' },
  { id: 'hf-19', name: 'Flounder Francaise' },
  { id: 'hf-20', name: 'London Broil' },
  { id: 'hf-21', name: 'Mac-N-Cheese' },
  { id: 'hf-22', name: 'Pork Chops' },
  { id: 'hf-23', name: 'Meat Lasagna' },
  { id: 'hf-24', name: 'Pulled Pork' },
  { id: 'hf-25', name: 'Pork Tenderloin' },
  { id: 'hf-26', name: 'Pasta Rustico' },
  { id: 'hf-27', name: 'Pasta Carbonara' },
  { id: 'hf-28', name: 'Pasta Bolognese' },
  { id: 'hf-29', name: 'Pot Roast' },
  { id: 'hf-30', name: 'Pepper Steak' },
  { id: 'hf-31', name: 'Potato Casserole' },
  { id: 'hf-32', name: 'Pasta Milanese' },
  { id: 'hf-33', name: 'Pasta Chicken with Broccoli' },
  { id: 'hf-34', name: 'Rice' },
  { id: 'hf-35', name: 'Stuffed Shells' },
  { id: 'hf-36', name: 'Sausage & Peppers' },
  { id: 'hf-37', name: 'Mashed Potatoes' },
  { id: 'hf-38', name: 'Seafood Pasta' },
  { id: 'hf-39', name: 'Tilapia' },
];

export const HOT_SANDWICHES: MenuItem[] = [
  { id: 'hs-1', name: 'Chicken Parmigiana', description: 'Breaded chicken cutlet with marinara and melted mozzarella' },
  { id: 'hs-2', name: 'Eggplant Parmigiana', description: 'Breaded eggplant with marinara and melted mozzarella' },
  { id: 'hs-3', name: 'Meatball Parmigiana', description: 'Homemade meatballs with marinara and melted mozzarella' },
  { id: 'hs-4', name: 'Philly Cheese Steak', description: 'Shaved steak with melted cheese and sautéed onions' },
  { id: 'hs-5', name: 'Chicken Philly Cheese', description: 'Grilled chicken, American cheese, sautéed onions & roasted peppers' },
  { id: 'hs-6', name: 'Mexican Cheese Steak', description: 'Steak, pepper jack cheese, hot peppers & onions' },
  { id: 'hs-7', name: 'Reuben Sandwich', description: 'Corned beef or pastrami, Swiss cheese, sauerkraut & Russian dressing' },
];

export const SIGNATURE_SANDWICHES: MenuItem[] = [
  { id: 'ss-1', name: 'Baked Eggplant Wrap', description: 'Breaded eggplant, fresh mozzarella, roasted peppers & balsamic vinegar' },
  { id: 'ss-2', name: 'The Black Forest Wrap', description: 'Smoked turkey, muenster cheese, coleslaw & Russian dressing' },
  { id: 'ss-3', name: 'The Bourbon Street', description: 'Chicken cutlet, cheddar cheese, red onion, lettuce, tomato, blue cheese dressing' },
  { id: 'ss-4', name: 'Blazing Buffalo Chicken Sandwich', description: 'Blazing buffalo chicken, lettuce, tomato, red onions & bleu cheese dressing' },
  { id: 'ss-5', name: 'California Sun Wrap', description: 'Chicken cutlet, pepper jack cheese, avocado, onions, lettuce, tomato & ranch' },
  { id: 'ss-6', name: 'Caprese Panini', description: 'Fresh mozzarella, roasted peppers, and balsamic vinegar' },
  { id: 'ss-7', name: 'Chicken Cordon Bleu Panini', description: 'Chicken cutlet, Virginia ham, Swiss cheese & honey mustard' },
  { id: 'ss-8', name: 'Cuban Sandwich', description: 'Fresh roast pork, deluxe ham, Swiss cheese, pickles & mayo, grilled on a panini press', popular: true },
  { id: 'ss-9', name: 'The Chipotle Chicken Wrap', description: 'Chipotle chicken, 3 pepper colby jack cheese, avocado, lettuce, tomato, onion & ranch', popular: true },
  { id: 'ss-10', name: 'Full House Ovengold Wrap', description: 'Ovengold turkey, bacon, Swiss cheese, avocado, red onion, lettuce, tomato & mayo', popular: true },
  { id: 'ss-11', name: 'Green Chicken Panini', description: 'Grilled chicken, fresh mozzarella, roasted red peppers or sundried tomatoes & balsamic vinaigrette' },
  { id: 'ss-12', name: 'Grilled Pavo', description: 'Grilled chicken breast, Virginia ham, pepper jack cheese, lettuce & Russian dressing' },
  { id: 'ss-13', name: 'The King Street', description: 'Chicken cutlet, crispy bacon, melted mozzarella & roasted peppers', popular: true },
  { id: 'ss-14', name: 'The Jerk Turkey', description: 'Jerk turkey, 3 pepper colby jack cheese, avocado, roasted peppers, lettuce, tomato & mayo' },
  { id: 'ss-15', name: 'Margherita Panini', description: 'Fresh mozzarella, plum tomato, fresh basil & olive oil' },
  { id: 'ss-16', name: 'Monte Christo Panini', description: 'Ovengold turkey, deluxe ham, Swiss cheese, lettuce, tomato & honey mustard' },
  { id: 'ss-17', name: 'Mexican Chicken Wrap', description: 'Grilled chicken, 3 pepper colby jack cheese, avocado, pico de gallo, lettuce & ranch' },
  { id: 'ss-18', name: 'Ranchero Wrap', description: 'Blazing buffalo chicken, pepper jack cheese, sautéed onions, lettuce, tomato, bacon, avocado & mayo' },
  { id: 'ss-19', name: 'Roast Pork Sandwich', description: 'Pork, mozzarella & roasted peppers on garlic bread' },
  { id: 'ss-20', name: 'The South Greeley Wrap', description: 'Chicken cutlet, bacon, melted Swiss cheese, lettuce, onion & mayo', popular: true },
  { id: 'ss-21', name: 'Spicy Combo Wrap', description: 'Chipotle chicken, jerk turkey, 3 pepper colby jack, lettuce, tomato, onions & blue cheese dressing' },
  { id: 'ss-22', name: 'The Yellow Stone', description: 'Ovengold turkey, deluxe roast beef, tomato, red onions & Russian dressing' },
];

export const BREAKFAST_ITEMS: MenuItem[] = [
  { id: 'br-1', name: 'Eggs on a Roll or Wrap', description: 'All sandwiches made with 2 eggs. Add cheese, sausage, ham, or bacon.' },
  { id: 'br-2', name: 'Eggs on a Hero', description: 'All sandwiches made with 2 eggs. Add cheese, sausage, ham, or bacon.' },
  { id: 'br-3', name: 'Pancakes', description: 'Add bacon, ham, sausage, or bananas' },
  { id: 'br-4', name: 'French Toast', description: 'Add bacon, ham, or sausage' },
  { id: 'br-5', name: 'Breakfast Lox Special', description: 'Nova Scotia lox, cream cheese, lettuce, tomato and onions on a bagel, rye, or wrap' },
  { id: 'br-6', name: 'Create Your Own Omelette', description: 'Three eggs with your choice of 2 items: peppers, onions, broccoli, tomato, spinach, cheese, ham, bacon' },
  { id: 'br-7', name: 'Donut' },
  { id: 'br-8', name: 'Danish', description: 'Available with cream cheese' },
  { id: 'br-9', name: 'Roll or Bagel', description: 'With butter or cream cheese' },
  { id: 'br-10', name: 'Muffin', description: 'Available with butter' },
];

export const GRILL_ITEMS: MenuItem[] = [
  { id: 'gr-1', name: 'Hot Dog' },
  { id: 'gr-2', name: 'Chicken Wings' },
  { id: 'gr-3', name: 'French Fries' },
  { id: 'gr-4', name: 'Grilled Cheese', description: 'Add ham or bacon' },
  { id: 'gr-5', name: 'Chicken Quesadilla', description: 'With lettuce, tomato, guacamole, salsa & sour cream' },
  { id: 'gr-6', name: 'Hamburger' },
  { id: 'gr-7', name: 'Cheeseburger', description: 'Add bacon' },
  { id: 'gr-8', name: 'Mexican Burger' },
  { id: 'gr-9', name: 'Cowboy Burger', description: 'With bacon, cheddar, grilled onion & BBQ sauce' },
];

export const SALADS: MenuItem[] = [
  { id: 'sa-1', name: '3 Bean Salad' },
  { id: 'sa-2', name: 'Beets' },
  { id: 'sa-3', name: 'Black Beans & Corn' },
  { id: 'sa-4', name: 'Broccoli & Cucumbers' },
  { id: 'sa-5', name: 'Chicken Fiesta Salad' },
  { id: 'sa-6', name: 'Chicken Salad' },
  { id: 'sa-7', name: 'Cucumber Salad' },
  { id: 'sa-8', name: 'Egg Salad' },
  { id: 'sa-9', name: 'Fruit Salad' },
  { id: 'sa-10', name: 'Health Salad' },
  { id: 'sa-11', name: 'Macaroni Salad' },
  { id: 'sa-12', name: 'Mixed Salad' },
  { id: 'sa-13', name: 'Potato Salad' },
  { id: 'sa-14', name: 'Seafood Salad' },
  { id: 'sa-15', name: 'Spa Tuna Salad' },
  { id: 'sa-16', name: 'Tomato Salad' },
  { id: 'sa-17', name: 'Tortellini Salad' },
  { id: 'sa-18', name: 'Tuna Salad' },
  { id: 'sa-19', name: 'Nova' },
  { id: 'sa-20', name: 'Bread Pudding' },
  { id: 'sa-21', name: 'Rice Pudding' },
];

export const SPECIALTY_SALADS: MenuItem[] = [
  { id: 'sp-1', name: 'Buffalo Salad' },
  { id: 'sp-2', name: 'Chef Salad' },
  { id: 'sp-3', name: 'Chopped Salad' },
  { id: 'sp-4', name: 'Classic Caesar Salad' },
  { id: 'sp-5', name: 'Cobb Salad' },
  { id: 'sp-6', name: 'Grilled Chicken Spinach Salad' },
  { id: 'sp-7', name: 'House Salad' },
  { id: 'sp-8', name: 'Build Your Own Salad' },
];

export const BREAKFAST_SIDES: MenuItem[] = [
  { id: 'bs-1', name: 'Hash Browns' },
  { id: 'bs-2', name: 'Bacon' },
  { id: 'bs-3', name: 'Sausage' },
];

export const CATERING_CATEGORIES: MenuItem[] = [
  { id: 'cat-1', name: "Hors d'Oeuvres", description: 'Assorted appetizer platters' },
  { id: 'cat-2', name: 'Cheese & Meat Platters', description: 'Curated deli meat and cheese displays' },
  { id: 'cat-3', name: 'Salads', description: 'Fresh-made salads in large format' },
  { id: 'cat-4', name: 'Hero Subs (2ft–6ft)', description: 'Giant hero sandwiches for groups' },
  { id: 'cat-5', name: 'Sandwich Platters', description: 'Assorted sandwich selections' },
  { id: 'cat-6', name: 'Wrap Platters', description: 'Assorted wrap selections' },
  { id: 'cat-7', name: 'Hot Entrées', description: 'Full-sized hot dishes for events' },
  { id: 'cat-8', name: 'Whole Chicken, Turkey & Hams', description: 'Whole roasted proteins' },
];

export const BYO_OPTIONS: BYOOptions = {
  bread: ['Roll', 'Hero / Wedge', 'Wrap', 'Rye', 'Whole Wheat', 'Bagel', 'Panini Press'],
  meat: ['Roast Beef (House Roasted)', 'Ovengold Turkey', 'Smoked Turkey', 'Jerk Turkey', 'Virginia Ham', 'Deluxe Ham', 'Pastrami', 'Corned Beef', 'Salami', 'Fresh Turkey', 'Chicken Cutlet', 'Grilled Chicken'],
  cheese: ['American', 'Swiss', 'Provolone', 'Mozzarella', 'Fresh Mozzarella', 'Pepper Jack', '3-Pepper Colby Jack', 'Cheddar', 'Muenster', 'No Cheese'],
  toppings: ['Lettuce', 'Tomato', 'Onion', 'Red Onion', 'Roasted Peppers', 'Hot Peppers', 'Pickles', 'Sauerkraut', 'Coleslaw', 'Avocado', 'Bacon', 'Sundried Tomatoes'],
  condiments: ['Mayo', 'Mustard', 'Honey Mustard', 'Russian Dressing', 'Blue Cheese Dressing', 'Ranch', 'Balsamic Vinegar', 'Olive Oil', 'Ketchup', 'Salt & Pepper'],
};

export const MENU_CATEGORIES: MenuCategory[] = [
  { key: 'hotFoods', label: 'Hot Foods', icon: 'flame-outline', data: HOT_FOODS, note: 'Hot foods change daily' },
  { key: 'hotSandwiches', label: 'Hot Sandwiches', icon: 'restaurant-outline', data: HOT_SANDWICHES, note: 'All wedges extra' },
  { key: 'signatures', label: 'Signatures', icon: 'star-outline', data: SIGNATURE_SANDWICHES, note: 'All wedges extra' },
  { key: 'breakfast', label: 'Breakfast', icon: 'cafe-outline', data: BREAKFAST_ITEMS },
  { key: 'grill', label: 'Grill', icon: 'bonfire-outline', data: GRILL_ITEMS },
  { key: 'salads', label: 'Salads', icon: 'leaf-outline', data: SALADS },
  { key: 'specialtySalads', label: 'Specialty', icon: 'nutrition-outline', data: SPECIALTY_SALADS },
  { key: 'catering', label: 'Catering', icon: 'gift-outline', data: CATERING_CATEGORIES },
];
