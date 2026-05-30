import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { router } from "@inertiajs/react";

interface CustomBillTabProps {
  tabs: {
    value: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
  }[];
  defaultValue?: string;
  headerLeft?: React.ReactNode;
  children?: React.ReactNode;
}

export default function CustomBillTab({
  tabs,
  defaultValue,
}: CustomBillTabProps) {
  const [activeSub, setActiveSub] = useState(defaultValue);

  return (
    <div className="flex justify-start pt-3">
      <Tabs value={activeSub} onValueChange={setActiveSub}>
        <TabsList className="flex gap-6 bg-white p-2 border">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="
                p-3
                text-lg
                font-bold
                border-b-2
                data-[state=active]:border-blue-400
                data-[state=active]:text-blue-400
                data-[state=active]:bg-blue-50
                cursor-pointer
              "
              onClick={() => {
                if (tab.href) {
                  router.visit(tab.href);
                }
              }}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}

