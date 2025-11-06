import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';

interface LegalScreenProps {
  onBack: () => void;
  type: 'tos' | 'privacy' | 'refund';
}

const tosContent = `
Welcome to Aura Voice Chat! These terms of service outline the rules and regulations for the use of our application.

By accessing this app we assume you accept these terms of service. Do not continue to use Aura Voice Chat if you do not agree to take all of the terms of service stated on this page.

License:
Unless otherwise stated, Aura Voice Chat and/or its licensors own the intellectual property rights for all material on Aura Voice Chat. All intellectual property rights are reserved.

You must not:
- Republish material from Aura Voice Chat
- Sell, rent or sub-license material from Aura Voice Chat
- Reproduce, duplicate or copy material from Aura Voice Chat
- Redistribute content from Aura Voice Chat

This Agreement shall begin on the date hereof.
`;

const privacyContent = `
Your privacy is important to us. It is Aura Voice Chat's policy to respect your privacy regarding any information we may collect from you across our app.

Information we collect:
We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.

Log data:
When you use our app, we may automatically log the standard data provided by your device. This data may include your device's Internet Protocol (IP) address, your device type and version, your activity within the app, and other details about your usage.

Security:
We take security seriously and do what we can to protect your personal information from loss or theft, as well as unauthorized access, disclosure, copying, use or modification. That said, we advise that no method of electronic transmission or storage is 100% secure and cannot guarantee absolute data security.
`;

const refundContent = `
Aura Voice Chat Refund Policy

Last updated: October 30, 2025

All purchases of virtual items (such as Coins and Diamonds) are final and non-refundable.

Exceptions:
We may consider refunds on a case-by-case basis under the following circumstances:
- If there was a technical error during the transaction process.
- If there is evidence of fraudulent activity on your account.

We do not provide refunds or credits for any partially used virtual items.

To request a refund based on the exceptions above, please contact our support team with your user ID and transaction details.

By making a purchase in Aura Voice Chat, you acknowledge and agree to this refund policy.
`;

export const LegalScreen: React.FC<LegalScreenProps> = ({ onBack, type }) => {
    const contentMap = {
      tos: { title: 'Terms of Service', content: tosContent },
      privacy: { title: 'Privacy Policy', content: privacyContent },
      refund: { title: 'Refund Policy', content: refundContent },
    };
    
    const { title, content } = contentMap[type];

  return (
    <SubScreenWrapper title={title} onBack={onBack}>
        <div className="p-6">
            <div className="bg-slate-800/50 p-6 rounded-lg text-gray-300 whitespace-pre-wrap text-sm">
                {content}
            </div>
        </div>
    </SubScreenWrapper>
  );
};