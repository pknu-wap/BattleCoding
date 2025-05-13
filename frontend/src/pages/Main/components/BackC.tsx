export const CodeC = `class Player:
    player_count = 0
    def __init__(self, name, position, number):
        Player.player_count += 1
        self.number_of_player = Player.player_count
        self.name = name
        self.position = position
        self.number = number

    def __str__(self):
        return (f"Name: {self.name}, Position: {self.position}, Number: {self.number} \n"
                f"Total number of players: {self.number_of_player}")

players = []

while True:
    name = input("Enter player name (type 'exit' to finish): ")
    if name.lower() == 'exit':
        break

    position = input(f"Enter {name}'s position: ")

    number = input(f"Enter {name}'s jersey number: ")
    if not number.isdigit() or int(number) < 1:
        print("Invalid number. Please enter a valid positive number.")
        continue

    number = int(number)

    new_player = Player(name, position, number)
    players.append(new_player)

    print("Player has been successfully registered.")

print("Player List:")
for player in players:
    print(player)
    print("-" * 30)
`;
