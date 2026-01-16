"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimpleMintForm } from "./simple-mint-form"
import { AdvancedMintForm } from "./advanced-mint-form"

export function SingleMintForm() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Mint Single Certificate</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose between simple minting (quick & easy) or advanced minting (custom details & images)
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="simple" className="space-y-6">
        <TabsList className="bg-card border border-border w-full">
          <TabsTrigger value="simple" className="data-[state=active]:bg-primary flex-1">
            Simple Mint
          </TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-primary flex-1">
            Advanced Mint
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simple">
          <SimpleMintForm />
        </TabsContent>

        <TabsContent value="advanced">
          <AdvancedMintForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
