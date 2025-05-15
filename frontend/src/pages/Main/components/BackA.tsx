export const CodeA = `class Order:
    order_count = 0
    def __init__(self, drink_name, quantity, total_price):
        Order.order_count += 1
        self.order_number = Order.order_count
        self.drink_name = drink_name
        self.quantity = quantity
        self.total_price = total_price

    def __str__(self):
        return (f'''Order Number: {self.order_number}
Drink Name: {self.drink_name}
Quantity: {self.quantity}
Total Price: {self.total_price} KRW''')

menu = {
    'Americano': 4500,
    'Cafe Latte': 5500,
    'Caramel Macchiato': 5500,
    'Cafe Mocha': 5300,
    'Condensed Milk Latte': 6000
}

order_history = []

while True:
    print('Menu')
    for drink, price in menu.items():
        print(f"{drink} : {price} KRW")

    drink_name = input("Enter the name of the drink (type 'exit' to quit): ")
    if drink_name.lower() == 'exit':
        break
    if drink_name not in menu:
        print("This drink is not on the menu. Please try again.")
        continue

    quantity = input(f"How many {drink_name} would you like to order? ")
    if not quantity.isdigit() or int(quantity) < 1:
        print("Invalid quantity. Please enter a positive number.")
        continue

    quantity = int(quantity)
    total_price = menu[drink_name] * quantity

    new_order = Order(drink_name, quantity, total_price)
    order_history.append(new_order)

    print("Your order has been placed successfully:")
    print(new_order)

print("Order History:")
for order in order_history:
    print(order)
    print('-' * 30)
`;
