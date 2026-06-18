import { tool } from "ai"
import { z } from "zod"

export const tools = {
    generateDiagram: tool({
        description: "Generates a fully formed, visually appealing Excalidraw diagram as an array of structured elements. Trigger this when the user requests a flow, architecture, flowchart, or diagram. ALWAYS calculate valid absolute positions (x, y, width, height) relative to a central canvas so shapes do not stack. Connect shapes chronologically using 'arrow' types with valid startBinding and endBinding references matching the element IDs. Ensure high contrast colors and accurate text alignments.",

        inputSchema: z.object({
            elements: z.array(
                z.object({
                    id: z.string().describe("Unique identifier for the element"),
                    type: z.enum(["rectangle", "ellipse", "diamond", "text", "arrow", "line"]).describe("Type of the element"),
                    x: z.number().describe("X-coordinate for the element"),
                    y: z.number().describe("Y-coordinate for the element"),
                    width: z.number().describe("Width of the element"),
                    height: z.number().describe("Height of the element"),
                    strokeColor: z.string().default("#1e1e1e").describe("Stroke color in (hex)"),
                    backgroundColor: z.string().default("transparent"),
                    fillStyle: z.enum(["solid", "hachure", "cross-hatch"]).default("solid"),
                    strokeWidth: z.number().default(2),
                    roughness: z.number().default(0).describe("0 for clean, 1 for sketchy look"),
                    opacity: z.number().default(100),
                    text: z.string().optional().describe("Text content for text elements"),
                    fontSize: z.number().optional().default(16),
                    fontFamily: z.number().default(1).describe("1=Virgil, 2=Zebra, 3=Hand, 4=Cascadia"),
                    textAlign: z.enum(["left", "center", "right"]).default("center"),
                    points: z.array(z.tuple([z.number(), z.number()])).optional().describe("Array of [x,y] points (for array/line elements).Each point is a two number array"),
                    startBinding: z.object({
                        elementId: z.string(),
                        focus: z.number().default(0),
                        gap: z.number().default(1),
                    }).optional(),
                    endBinding: z.object({
                        elementId: z.string(),
                        focus: z.number().default(0),
                        gap: z.number().default(1),
                    }).optional()
                    
                }),

            )
        }),
        execute: async ({ elements }) => {
            return {elements}
        }
    }),

    modifyDiagram: tool({
        description: "Modifies an existing elements  on the canvas by id.  Use this when the user wants to change an existing diagram. Set only the fields you want to change ,leave everything else alone .",

        inputSchema: z.object({
            elementId: z.string().describe("The id of the element to modify"),
            updates: z.object({
                x: z.number().describe("X-coordinate for the element"),
                y: z.number().describe("Y-coordinate for the element"),
                width: z.number().describe("Width of the element"),
                height: z.number().describe("Height of the element"),
                strokeColor: z.string().default("#1e1e1e").describe("Stroke color in (hex)"),
                backgroundColor: z.string().default("transparent"),
                fillStyle: z.enum(["solid", "hachure", "cross-hatch"]).default("solid"),
                strokeWidth: z.number().default(2),
                roughness: z.number().default(0).describe("0 for clean, 1 for sketchy look"),
                opacity: z.number().default(100),
            })

        }),

        execute: async ({ elementId, updates }) => {
            return { elementId, updates }

        }

    })
}
