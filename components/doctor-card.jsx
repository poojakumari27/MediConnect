"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { User, Star, Calendar } from "lucide-react";
import { Button } from "./ui/button";

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="border border-blue-900/20 bg-white/5 backdrop-blur-sm hover:border-blue-500/40 transition-all shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-blue-100/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {doctor.imageUrl ? (
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-14 h-14 object-cover rounded-full"
              />
            ) : (
              <User className="h-6 w-6 text-blue-500" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap">
              <h3 className="font-semibold text-white text-lg">
                {doctor.name}
              </h3>
              <Badge
                variant="outline"
                className="border-yellow-400 text-yellow-400 bg-yellow-400/10 flex items-center gap-1"
              >
                <Star className="h-3.5 w-3.5 fill-yellow-400" />
                Verified
              </Badge>
            </div>
            <p className="text-sm text-blue-100 mt-1">
              {doctor.specialty} • {doctor.experience} years experience
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {doctor.description}
        </p>

        <Button
          asChild
          className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
        >
          <Link href={`/doctors/${doctor.specialty}/${doctor.id}`}>
            <Calendar className="h-4 w-4 mr-2" />
            View Profile & Book
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
