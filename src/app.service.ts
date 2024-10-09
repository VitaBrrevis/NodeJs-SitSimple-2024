import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHeaderContent(): string {
    return 'SitSimple';
  }
  getFooterContent() {
    return [
      { title: 'Product', links: ['About', 'FAQs', 'Investors', 'Account', 'Your Restaurant'] },
      { title: 'Support', links: ['Refund Policy', 'Privacy Policy', 'Terms of Service'] },
    ];
  }
}
