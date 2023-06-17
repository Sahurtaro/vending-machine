const readline = require("readline");

class Snack {
  public nombre: string;
  public cantidad: number;
  public precio: number;

  constructor(nombre: string, cantidad: number, precio: number) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;
  }
}

class VendingMachine {
  private snacks: Snack[];

  constructor(snacks: Snack[]) {
    this.snacks = snacks;
  }

  public displaySnacks(): void {
    console.log("Snacks disponibles:");
    this.snacks.forEach((snack, index) => {
      console.log(`${index + 1}. ${snack.nombre} - Cantidad: ${snack.cantidad} - Precio: $${snack.precio}`);
    });
  }

  public buySnack(snackIndex: number, amount: number): void {
    if (snackIndex < 1 || snackIndex > this.snacks.length) {
      console.log("Esta opción no es válida, por favor intenta de nuevo");
      return;
    }

    const selectedSnack = this.snacks[snackIndex - 1];
    if (selectedSnack.cantidad === 0) {
      console.log("¡Este snack está agotado, por favor intente comprar otro snack");
      return;
    }

    if (amount < selectedSnack.precio) {
      console.log("¡El dinero no alcanza!");
      return;
    }

    const vuelto = amount - selectedSnack.precio;
    console.log(`Has comprado ${selectedSnack.nombre}.`);
    console.log(`El vuelto es de: $${vuelto}`);
    selectedSnack.cantidad--;
  }
}

function main() {
  const snacks = [
    new Snack("Manjar blanco", 10, 2000),
    new Snack("Cocada", 10, 3000),
    new Snack("Chontaduros", 8, 4000),
    new Snack("Dulce de guayaba", 3, 1000),
  ];

  const vendingMachine = new VendingMachine(snacks);

  console.log("Bienvenido a la máquina expendedora de snacks");

  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const processUserInput = () => {
    vendingMachine.displaySnacks();

    rl.question("Seleccione el número del snack que desea comprar: ", (snackInput: any) => {
      const snackIndex = parseInt(snackInput);

      rl.question("Ingrese la cantidad con la que quiere pagar: ", (amountInput: any) => {
        const amount = parseInt(amountInput);
        vendingMachine.buySnack(snackIndex, amount);

        rl.question("¿quiere seguir comprando? (s/n): ", (answer: any) => {
          if (answer.toLowerCase() === "s") {
            processUserInput();
          } else {
            console.log("Gracias por comprar nuestros snacks ❤");
            rl.close();
          }
        });
      });
    });
  };
  processUserInput();
}

main();
