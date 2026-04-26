import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Gift, Map, Camera, Heart, Mountain, Star, Clock, Users, BarChart3, FileText, Image, Navigation, Calendar, Thermometer, Shield, Globe, MessageSquare, Download, Share2, Trophy, BookOpen } from "lucide-react";

const HikeJournalSummary = () => {
  const currentFeatures = [
    { icon: <Users className="w-5 h-5" />, title: "Person Management", desc: "Add, view, and delete people with unique IDs" },
    { icon: <Map className="w-5 h-5" />, title: "Activity Tracking", desc: "Log hiking and camping activities with date, location, miles, and nights" },
    { icon: <BarChart3 className="w-5 h-5" />, title: "Activity Charts", desc: "Visual summary of activities using Recharts" },
    { icon: <Clock className="w-5 h-5" />, title: "Activity Totals", desc: "Track total miles hiked and nights camped per person" },
    { icon: <Star className="w-5 h-5" />, title: "Dark/Light Theme", desc: "Toggle between dark and light modes with next-themes" },
    { icon: <FileText className="w-5 h-5" />, title: "Form Validation", desc: "React Hook Form with Zod schema validation" },
    { icon: <Globe className="w-5 h-5" />, title: "Supabase Integration", desc: "Backend-ready with Supabase client configured" },
    { icon: <BarChart3 className="w-5 h-5" />, title: "React Query", desc: "Data fetching and caching with TanStack React Query" },
  ];

  const recommendedFeatures = [
    { icon: <Camera className="w-5 h-5" />, title: "Photo Gallery", desc: "Upload and organize photos for each hike with captions and timestamps", priority: "High" },
    { icon: <Map className="w-5 h-5" />, title: "GPX Track Viewer", desc: "Upload and display GPX tracks on an interactive map (e.g., Leaflet or Mapbox)", priority: "High" },
    { icon: <Heart className="w-5 h-5" />, title: "Favorites & Ratings", desc: "Rate hikes (1-5 stars) and mark favorites for quick access", priority: "Medium" },
    { icon: <Mountain className="w-5 h-5" />, title: "Elevation Profile", desc: "Show elevation gain/loss charts from GPX data with min/max elevation", priority: "High" },
    { icon: <Calendar className="w-5 h-5" />, title: "Trail Conditions Log", desc: "Record weather, trail conditions, bugs, and seasonal notes", priority: "Medium" },
    { icon: <Thermometer className="w-5 h-5" />, title: "Weather Integration", desc: "Auto-fetch historical weather data for hike dates via API", priority: "Low" },
    { icon: <BookOpen className="w-5 h-5" />, title: "Rich Text Journal Entries", desc: "Write detailed notes per hike with rich text editor (Markdown support)", priority: "High" },
    { icon: <Image className="w-5 h-5" />, title: "Achievement Badges", desc: "Earn badges for milestones (e.g., 100 miles, 10 peaks, 4 seasons)", priority: "Low" },
    { icon: <Navigation className="w-5 h-5" />, title: "Trail Search & Import", desc: "Search and import trails from AllTrails, GaiaGPS, or OpenStreetMap", priority: "Medium" },
    { icon: <Users className="w-5 h-5" />, title: "Hiking Partners", desc: "Tag who you hiked with from your people list and see shared hikes", priority: "Medium" },
    { icon: <Shield className="w-5 h-5" />, title: "Safety Checklist", desc: "Pre-hike checklist (water, first-aid, layers) and emergency contacts", priority: "Medium" },
    { icon: <Globe className="w-5 h-5" />, title: "Offline Support", desc: "PWA with offline mode to view journal entries without signal", priority: "Low" },
    { icon: <MessageSquare className="w-5 h-5" />, title: "Comments & Reflection", desc: "Add structured reflections: difficulty, highlights, things to improve", priority: "Medium" },
    { icon: <Download className="w-5 h-5" />, title: "Export & Print", desc: "Export journal as PDF, CSV, or printable book format", priority: "Low" },
    { icon: <Share2 className="w-5 h-5" />, title: "Social Sharing", desc: "Share hike summaries to social media or generate shareable links", priority: "Low" },
    { icon: <Trophy className="w-5 h-5" />, title: "Statistics Dashboard", desc: "Yearly summaries, longest hike, highest elevation, total stats", priority: "High" },
    { icon: <Clock className="w-5 h-5" />, title: "Duration Tracking", desc: "Track start/end times, total duration, and moving time", priority: "Medium" },
    { icon: <Map className="w-5 h-5" />, title: "Interactive Map View", desc: "See all hikes on a map with filters by date, difficulty, or rating", priority: "High" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
            Hike Journal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Transform your Hiking & Camping Tracker into a comprehensive journal of all your completed hikes
          </p>
        </div>

        {/* Current Features */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold">Current Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentFeatures.map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <div className="text-blue-600 dark:text-blue-400">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recommended Features */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Gift className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold">Recommended Features</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Features to transform this into a complete hike journal application
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedFeatures.map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <div className="text-purple-600 dark:text-purple-400">{feature.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <Badge className={getPriorityColor(feature.priority)}>{feature.priority}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Implementation Roadmap */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Mountain className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl font-bold">Implementation Roadmap</h2>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-600">Phase 1: Core Journal Features (High Priority)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Photo Gallery - Upload and organize hike photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Rich Text Journal Entries - Detailed notes with Markdown support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>GPX Track Viewer - Upload and display trail routes on maps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Elevation Profile - Visualize elevation gain/loss from GPX data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Statistics Dashboard - Comprehensive hike statistics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Interactive Map View - See all hikes on a map</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-yellow-600">Phase 2: Enhanced Experience (Medium Priority)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Favorites & Ratings - Rate and mark favorite hikes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Trail Conditions Log - Weather and trail condition notes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Trail Search & Import - Import trails from hiking platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Hiking Partners - Tag friends and see shared adventures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Safety Checklist - Pre-hike preparation and emergency info</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Duration Tracking - Track time spent on each hike</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Comments & Reflection - Structured post-hike reflections</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Phase 3: Advanced Features (Low Priority)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Achievement Badges - Gamification with milestone badges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Weather Integration - Auto-fetch historical weather data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Offline Support - PWA with offline journal access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Export & Print - Generate PDF or printable journal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Social Sharing - Share hikes on social media</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tech Stack Summary */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Current Tech Stack</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["React 18", "Vite 6", "TypeScript", "Tailwind CSS", "shadcn-ui", "Recharts", "Supabase", "React Query", "React Hook Form", "Zod", "date-fns", "next-themes"].map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm py-2 px-3 justify-center">{tech}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Start with Phase 1 features to build a solid foundation for your Hike Journal</p>
        </div>
      </div>
    </div>
  );
};

export default HikeJournalSummary;
