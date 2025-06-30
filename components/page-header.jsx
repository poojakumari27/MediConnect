// components/page-header.jsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export function PageHeader({
  icon,
  title,
  backLink = "/",
  backLabel = "Back to Home",
}) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <Link href={backLink}>
        <Button
          variant="outline"
          size="sm"
          className="w-fit border-blue-900/30 text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {backLabel}
        </Button>
      </Link>

      <div className="flex items-end gap-2">
        {icon && (
          <div className="text-blue-400">
            {React.cloneElement(icon, {
              className: "h-12 md:h-14 w-12 md:w-14",
            })}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400">
          {title}
        </h1>
      </div>
    </div>
  );
}
