"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How does the 7-day free trial work?",
        answer: "Start using ZapPOD immediately with full access to all Pro or Scale features. No credit card required. Cancel anytime during the trial period with no charges."
    },
    {
        question: "Can I switch plans later?",
        answer: "Absolutely! You can upgrade or downgrade your plan anytime from your account settings. Changes take effect immediately."
    },
    {
        question: "What happens after I reach my design limit on the Free plan?",
        answer: "You'll be prompted to upgrade to Pro for unlimited designs. Your existing designs remain accessible, but you won't be able to create new ones until the next month or until you upgrade."
    },
    {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 14-day money-back guarantee. If you're not satisfied with ZapPOD, contact us within 14 days of your purchase for a full refund."
    },
    {
        question: "What file formats do you support for export?",
        answer: "Designs can be exported as high-resolution PNG files. SEO copy is available as plain text or JSON format for easy integration with your store."
    },
    {
        question: "Is commercial use allowed?",
        answer: "Yes! Pro and Scale plans include full commercial rights. The Free plan is for personal use only."
    },
    {
        question: "Can I use ZapPOD for multiple stores?",
        answer: "Yes! All plans allow you to use ZapPOD across multiple POD platforms (Etsy, Shopify, Redbubble, etc.)."
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-gray-900/50">
            <div className="container mx-auto px-6 sm:px-12 lg:px-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Everything you need to know about ZapPOD
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden transition-all hover:border-gray-600"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <h3 className="text-base font-medium text-white pr-4">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-5 pb-5">
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-400 text-sm">
                        Still have questions?{" "}
                        <a href="#" className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
                            Contact our support team
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
