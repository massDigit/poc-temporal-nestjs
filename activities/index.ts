export async function verifyStock(orderId: string): Promise<void> {
  console.log(
    `[verifyStock] Vérification du stock pour la commande ${orderId}`,
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`[verifyStock] Stock disponible pour ${orderId}`);
}

export async function processPayment(orderId: string): Promise<void> {
  console.log(`[processPayment] Traitement du paiement pour ${orderId}`);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log(`[processPayment] Paiement validé pour ${orderId}`);
}

export async function sendEmail(orderId: string): Promise<void> {
  console.log(`[sendEmail] Envoi email de confirmation pour ${orderId}`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`[sendEmail] Email envoyé pour ${orderId}`);
}
