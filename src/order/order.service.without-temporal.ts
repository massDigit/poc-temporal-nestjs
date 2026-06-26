import { Injectable } from '@nestjs/common';

/**
 * COMPARAISON — Même logique métier que orderWorkflow SANS Temporal
 *
 * Problèmes de cette approche :
 * 1. Pas de persistance d'état — si le serveur crashe, la commande est perdue
 * 2. Retry manuel — à écrire soi-même, non standardisé, non testé
 * 3. Pas de traçabilité — impossible de savoir où en est une commande
 * 4. État incohérent — paiement débité sans confirmation email possible
 * 5. Pas de reprise automatique — intervention manuelle obligatoire
 */
@Injectable()
export class OrderServiceWithoutTemporal {
  async createOrder(orderId: string): Promise<string> {
    // Si le serveur crashe ici → commande silencieusement perdue
    await this.verifyStock(orderId);

    // Retry écrit manuellement — non standardisé
    // Si ça échoue → on ne sait pas si le paiement a été débité
    await this.retryManual(() => this.processPayment(orderId), 3);

    // Si le serveur redémarre ici :
    //    → paiement débité
    //    → pas d'email envoyé
    //    → commande dans un état incohérent
    //    → aucune reprise possible sans code supplémentaire
    await this.sendEmail(orderId);

    return `Order ${orderId} processed`;
  }

  // À écrire manuellement pour chaque cas d'usage
  private async retryManual(
    fn: () => Promise<void>,
    attempts: number,
  ): Promise<void> {
    for (let i = 0; i < attempts; i++) {
      try {
        await fn();
        return;
      } catch (e) {
        if (i === attempts - 1) throw e;
        // Backoff non configurable, non observable
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
      }
    }
  }

  private async verifyStock(orderId: string): Promise<void> {
    console.log(`[without-temporal][verifyStock] ${orderId}`);
    await new Promise((r) => setTimeout(r, 3000));
  }

  private async processPayment(orderId: string): Promise<void> {
    console.log(`[without-temporal][processPayment] ${orderId}`);
    await new Promise((r) => setTimeout(r, 5000));
  }

  private async sendEmail(orderId: string): Promise<void> {
    console.log(`[without-temporal][sendEmail] ${orderId}`);
    await new Promise((r) => setTimeout(r, 2000));
  }
}
