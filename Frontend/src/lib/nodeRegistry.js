import { Bot, Clock, GitBranch, Globe, Mail, Webhook } from "lucide-react";

export const nodeRegistry = [
    {
        kind: "webhook",
        type: "trigger",
        label: "Webhook",
        icon: Webhook,
        category: "Triggers"
    },

    {
        kind: "schedule",
        type: "trigger",
        label: "Schedule",
        icon: Clock,
        category: "Triggers"
    },

    {
        kind: "http",
        type: "action",
        label: "HTTP",
        icon: Globe,
        category: "Actions"
    },

    {
        kind: "email",
        type: "action",
        label: "Email",
        icon: Mail,
        category: "Actions"
    },

    {
        kind: "openAi",
        type: "ai",
        label: "OpenAi",
        icon: Bot,
        category: "AI"
    },

    {
        kind: "if",
        type: "condition",
        label: "IF",
        icon: GitBranch,
        category:"conditions",
    },

];

