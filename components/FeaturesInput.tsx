"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Feature {
  title: string;
  description: string;
}

interface FeaturesInputProps {
  value: Feature[];
  onChange: (features: Feature[]) => void;
  labels: {
    addFeature: string;
    title: string;
    description: string;
    titlePlaceholder: string;
    descriptionPlaceholder: string;
  };
}

export function FeaturesInput({ value, onChange, labels }: FeaturesInputProps) {
  const addFeature = () => {
    onChange([...value, { title: "", description: "" }]);
  };

  const removeFeature = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, field: keyof Feature, val: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {value.map((feature, index) => (
        <div key={index} className="rounded-lg border border-border p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-3">
              <div>
                <label className="text-sm font-medium">{labels.title}</label>
                <Input
                  value={feature.title}
                  onChange={(e) => updateFeature(index, "title", e.target.value)}
                  placeholder={labels.titlePlaceholder}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{labels.description}</label>
                <Input
                  value={feature.description}
                  onChange={(e) => updateFeature(index, "description", e.target.value)}
                  placeholder={labels.descriptionPlaceholder}
                  className="mt-1"
                />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeFeature(index)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addFeature}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        {labels.addFeature}
      </Button>
    </div>
  );
}
