import { MessageSquare, Shirt, FileText } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Prompt & Generate",
        description: "Simply describe your idea in plain text. Our AI generates a unique, ready-to-print design in seconds.",
        icon: MessageSquare,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
    },
    {
        id: 2,
        title: "Visualize & Customize",
        description: "See your design instantly on a high-quality T-shirt mockup. Add text overlays or tweak colors with ease.",
        icon: Shirt,
        color: "text-teal-400",
        bg: "bg-teal-500/10",
        border: "border-teal-500/20",
    },
    {
        id: 3,
        title: "Copy & Publish",
        description: "Get SEO-optimized titles, descriptions, and tags generated automatically. Export ready for Etsy or Shopify.",
        icon: FileText,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-gray-900/50">
            <div className="container mx-auto px-6 sm:px-12 lg:px-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                        From Idea to Product in <span className="text-purple-400">3 Simple Steps</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        ZapPOD streamlines the entire process, so you can focus on selling.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className={`relative rounded-2xl border ${step.border} bg-gray-800/50 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
                        >
                            <div className={`absolute -top-6 left-8 inline-flex h-12 w-12 items-center justify-center rounded-xl ${step.bg} ${step.color} shadow-lg ring-1 ring-white/10`}>
                                <step.icon className="h-6 w-6" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                            <div className="absolute top-8 right-8 text-6xl font-bold text-white/5 select-none">
                                {step.id}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
