import { MessageSquare, Shirt, FileText, ArrowRight } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Prompt & Generate",
        description: "Simply describe your idea in plain text. Our AI generates a unique, ready-to-print design in seconds.",
        icon: MessageSquare,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        shadow: "shadow-purple-500/10",
    },
    {
        id: 2,
        title: "Visualize & Customize",
        description: "See your design instantly on a high-quality T-shirt mockup. Add text overlays or tweak colors with ease.",
        icon: Shirt,
        color: "text-teal-400",
        bg: "bg-teal-500/10",
        border: "border-teal-500/20",
        shadow: "shadow-teal-500/10",
    },
    {
        id: 3,
        title: "Copy & Publish",
        description: "Get SEO-optimized titles, descriptions, and tags generated automatically. Export ready for Etsy or Shopify.",
        icon: FileText,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        shadow: "shadow-blue-500/10",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-[#0f172a] relative overflow-hidden">
            <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                        From Idea to Product in <span className="text-purple-400">3 Simple Steps</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        ZapPOD streamlines the entire process, so you can focus on selling.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-purple-500/30 via-teal-500/30 to-blue-500/30 border-t border-dashed border-gray-600/50 z-0"></div>

                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`relative rounded-2xl border ${step.border} bg-gray-800/40 p-8 backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-2xl ${step.shadow} group z-10`}
                        >
                            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 inline-flex h-14 w-14 items-center justify-center rounded-xl ${step.bg} ${step.color} shadow-lg ring-4 ring-[#0f172a] transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                <step.icon className="h-7 w-7" />
                            </div>

                            <div className="mt-8 text-center">
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>

                            {/* Step Number Background */}
                            <div className="absolute top-4 right-4 text-8xl font-black text-white/5 select-none -z-10 transition-opacity group-hover:opacity-10">
                                {step.id}
                            </div>

                            {/* Arrow for mobile flow */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden flex justify-center mt-8 text-gray-600">
                                    <ArrowRight className="h-6 w-6 rotate-90" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

