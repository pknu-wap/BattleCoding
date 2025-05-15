export const CodeB = `class Car:
    _id_counter = 0
    def __init__(self, model, manufacturer, year, mileage):
        Car._id_counter += 1
        self.id = Car._id_counter
        self.model = model
        self.manufacturer = manufacturer
        self.year = year
        self.mileage = mileage

    def __str__(self):
        return (f'''ID: {self.id}
Model: {self.model}
Manufacturer: {self.manufacturer}
Year: {self.year}
Mileage: {self.mileage} km''')

def check_duplicate(cars, new_model):
    if any(car.model == new_model for car in cars):
        print(f'{new_model} is already registered.')
        return True
    return False

cars = []

while True:
    model = input("Enter the car model (type 'exit' to quit): ")
    if model.lower() == 'exit':
        break
    if check_duplicate(cars, model):
        continue

    manufacturer = input(f"Enter the manufacturer of {model}: ")

    year = input(f"Enter the production year of {model}: ")
    if not year.isdigit() or int(year) < 1:
        print("Invalid year. Please enter a valid number.")
        continue

    mileage = input(f"Enter the mileage of {model}: ")
    if not mileage.isdigit() or int(mileage) < 1:
        print("Invalid mileage. Please enter a valid number.")
        continue

    year = int(year)
    mileage = int(mileage)

    new_car = Car(model, manufacturer, year, mileage)
    cars.append(new_car)

    print("Car has been registered successfully:")
    print(new_car)

print("List of registered cars:")
for car in cars:
    print(car)
    print("-" * 30)
`;
