import java.util.Scanner;

class CuentaBancaria {
    private int saldo;

    public CuentaBancaria(int saldoInicial) { quiero crear un repositorio con este codigo de un cajero automatico bien bacano
        this.saldo = saldoInicial;
    }

    public synchronized boolean retirarDinero(String cliente, int cantidad) {
        if (cantidad > saldo) {
            System.out.println("❌ " + cliente + " intentó retirar $" + cantidad + ", pero solo hay $" + saldo + " disponibles.");
            return false;
        } else {
            try {
                Thread.sleep(100); // Simula el tiempo de la transacción
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            saldo -= cantidad;
            System.out.println("✅ " + cliente + " retiró $" + cantidad + ". Saldo restante: $" + saldo);
            return true;
        }
    }

    public int getSaldo() {
        return saldo;
    }
}

class Cliente implements Runnable {
    private CuentaBancaria cuenta;
    private String nombre;
    private int cantidadRetiro;

    public Cliente(CuentaBancaria cuenta, Scanner scanner) {
        this.cuenta = cuenta;
        System.out.print("Ingrese su nombre: ");
        this.nombre = scanner.nextLine();
        System.out.print(nombre + ", ¿cuánto desea retirar? ");
        this.cantidadRetiro = scanner.nextInt();
        scanner.nextLine(); // Consumir la nueva línea
    }


    public void run() {
        cuenta.retirarDinero(nombre, cantidadRetiro);
    }
}

public class CajeroAutomatico {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        CuentaBancaria cuenta = new CuentaBancaria(500); // Saldo inicial

        // Creación de dos clientes
        Cliente cliente1 = new Cliente(cuenta, scanner);
        Cliente cliente2 = new Cliente(cuenta, scanner);

        Thread hilo1 = new Thread(cliente1);
        Thread hilo2 = new Thread(cliente2);

        hilo1.start();
        hilo2.start();

        try {
            hilo1.join();
            hilo2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Mostrar el saldo final
        System.out.println("🏦 Saldo final en la cuenta: $" + cuenta.getSaldo());

        scanner.close();
    }
