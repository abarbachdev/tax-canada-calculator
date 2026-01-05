
import React from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'understanding-rrsp-contributions',
    title: 'Understanding RRSP Contributions and Deadlines',
    description: 'A deep dive into how RRSPs work, how they can lower your taxable income, and the important deadlines you need to know.',
    content: (
      <div className="space-y-4">
        <p>A Registered Retirement Savings Plan (RRSP) is one of the most powerful tools available to Canadians for saving for retirement while also reducing their annual tax bill. When you contribute to an RRSP, that contribution is deducted from your total income for the year, meaning you pay tax on a smaller amount.</p>
        <h3 className="text-xl font-semibold">How it Works</h3>
        <p>Imagine you earn $80,000 in a year and contribute $5,000 to your RRSP. For tax purposes, the government will treat your income as if it were only $75,000. This can often drop you into a lower tax bracket for a portion of your income, resulting in significant savings.</p>
        <h3 className="text-xl font-semibold">Contribution Room</h3>
        <p>You can't contribute an unlimited amount. Your contribution room is calculated as 18% of your previous year's earned income, up to a maximum limit set by the government each year, plus any unused contribution room from previous years. You can find your personal limit on your Notice of Assessment from the CRA.</p>
        <h3 className="text-xl font-semibold">The Deadline</h3>
        <p>The deadline for RRSP contributions that can be used for the previous tax year is 60 days into the new year, typically February 29th or March 1st. This gives you a chance to see your total income for the year and make a last-minute contribution to reduce your tax burden before filing.</p>
      </div>
    ),
  },
  {
    slug: 'guide-to-canadian-tax-brackets',
    title: 'A Guide to Canadian Tax Brackets',
    description: 'Demystify the marginal tax rate system. Learn how federal and provincial tax brackets work together to determine your total tax.',
    content: (
       <div className="space-y-4">
        <p>Canada uses a progressive or "marginal" tax rate system. This means that as your income increases, the rate of tax you pay on that income also increases. However, it's a common misconception that all your income is taxed at your highest rate. This is not true.</p>
        <h3 className="text-xl font-semibold">How Marginal Rates Work</h3>
        <p>Your income is divided into several "brackets" or ranges. Each bracket has its own tax rate. You only pay the rate for a specific bracket on the portion of your income that falls within that range.</p>
        <p>For example, in 2025, the first federal bracket is 15% on income up to $55,867. If you earn $70,000, you don't pay 20.5% (the next bracket's rate) on the full $70,000. Instead, you pay:</p>
        <ul className="list-disc list-inside bg-gray-50 p-4 rounded-lg">
            <li>15% on the first $55,867 of your income.</li>
            <li>20.5% on the remaining income ($70,000 - $55,867 = $14,133).</li>
        </ul>
        <h3 className="text-xl font-semibold">Federal vs. Provincial</h3>
        <p>This system applies at both the federal and provincial levels. You calculate your federal tax using federal brackets and your provincial tax using your province's unique brackets. The two amounts are then added together to get your total income tax. This is why your province of residence has a major impact on your overall tax bill.</p>
      </div>
    ),
  },
  {
    slug: 'cpp-vs-qpp-whats-the-difference',
    title: 'CPP vs. QPP: What\'s the Difference?',
    description: 'Learn the key differences between the Canada Pension Plan (CPP) and the Quebec Pension Plan (QPP) and how they affect your paycheque.',
    content: (
       <div className="space-y-4">
        <p>The Canada Pension Plan (CPP) and Quebec Pension Plan (QPP) are mandatory public pension plans that provide contributors and their families with partial replacement of earnings in the case of retirement, disability, or death. Every employed Canadian contributes to one of these plans.</p>
        <h3 className="text-xl font-semibold">The Main Difference</h3>
        <p>The primary difference is jurisdiction. If you work in Quebec, you contribute to the QPP. If you work anywhere else in Canada, you contribute to the CPP. The plans are very similar and work together, meaning your contributions to either plan will count towards your retirement benefits regardless of where you live in Canada when you retire.</p>
        <h3 className="text-xl font-semibold">Differences in Contributions and Benefits</h3>
        <p>While the plans are similar, they are managed separately and have slightly different contribution rates and maximums. For example, in recent years, the QPP has had slightly higher contribution rates than the CPP. This also means there can be minor differences in the benefit amounts paid out for retirement or disability.</p>
        <p>Additionally, Quebec manages its own parental insurance plan (QPIP), which is funded by separate deductions, whereas the rest of Canada's parental leave benefits are funded through Employment Insurance (EI) premiums.</p>
      </div>
    ),
  },
  {
    slug: 'maximizing-your-tax-refund',
    title: 'Maximizing Your Tax Refund: Tips for Canadians',
    description: 'Discover common strategies and tax credits that can help you reduce your tax liability and increase the size of your refund.',
    content: (
      <div className="space-y-4">
        <p>Getting a tax refund feels great, but it simply means you overpaid your taxes throughout the year. The goal should be to pay the correct amount of tax. Here are some tips to ensure you're not paying more than you have to.</p>
        <h3 className="text-xl font-semibold">1. Maximize Your RRSP Contributions</h3>
        <p>As mentioned in our other article, this is the most direct way to lower your taxable income. Plan your contributions throughout the year, not just at the deadline.</p>
        <h3 className="text-xl font-semibold">2. Claim All Eligible Credits</h3>
        <p>Many Canadians miss out on valuable credits. Some common ones include:</p>
        <ul className="list-disc list-inside bg-gray-50 p-4 rounded-lg">
            <li><strong>Medical Expenses:</strong> You can claim a credit for a wide range of medical expenses for yourself, your spouse, or your dependents.</li>
            <li><strong>Charitable Donations:</strong> Claim your donations to registered charities for a federal and provincial credit.</li>
            <li><strong>Tuition and Education Credits:</strong> If you're a student, you can claim credits for tuition fees. These can even be transferred to a parent or spouse in some cases.</li>
            <li><strong>Canada Workers Benefit:</strong> A refundable credit for low-income individuals and families.</li>
        </ul>
        <h3 className="text-xl font-semibold">3. Tell Your Employer About Credits</h3>
        <p>You can file a TD1 form with your employer to let them know about major credits you plan to claim (like tuition). They can adjust the tax withheld from your paycheques, meaning you get more money throughout the year instead of waiting for a large refund.</p>
      </div>
    ),
  },
  {
    slug: 'common-tax-credits-you-might-be-missing',
    title: '5 Common Tax Credits You Might Be Missing',
    description: 'A look at some of the most overlooked tax credits that could save you money, from medical expenses to the disability tax credit.',
    content: (
       <div className="space-y-4">
        <p>Every year, Canadians leave money on the table by failing to claim all the tax credits they are entitled to. Here are five credits you should double-check if you're eligible for.</p>
        <h3 className="text-xl font-semibold">1. Medical Expenses</h3>
        <p>This is more than just prescriptions. It can include dental work, glasses, physiotherapy, and even travel costs to get medical care not available locally. Keep all your receipts!</p>
        <h3 className="text-xl font-semibold">2. Disability Tax Credit (DTC)</h3>
        <p>The DTC is a non-refundable tax credit that helps persons with disabilities or their supporting persons reduce the amount of income tax they may have to pay. Eligibility is not just for the severely disabled; it applies to anyone with a severe and prolonged impairment in physical or mental functions.</p>
        <h3 className="text-xl font-semibold">3. Canada Caregiver Credit</h3>
        <p>If you support a spouse, common-law partner, or a dependent with a physical or mental impairment, you may be able to claim this credit.</p>
        <h3 className="text-xl font-semibold">4. Home Accessibility Tax Credit</h3>
        <p>Did you make renovations to your home to make it safer or more accessible for a senior or someone with a disability? You may be able to claim a portion of the expenses for this non-refundable credit.</p>
        <h3 className="text-xl font-semibold">5. Climate Action Incentive Payment</h3>
        <p>For residents of Alberta, Saskatchewan, Manitoba, and Ontario, this is a refundable credit designed to offset the cost of the federal carbon tax. You claim it on your tax return, and it can result in a significant refund or reduction in tax owing.</p>
      </div>
    ),
  },
];
