
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeDollarSign, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import VisitCard, { Visit } from "@/components/dashboard/VisitCard";
import EarningsSummary from "@/components/dashboard/EarningsSummary";
import MapView from "@/components/dashboard/MapView";

// Mock data
const visitsData: Visit[] = [
  {
    id: '1',
    patientName: 'John Doe',
    patientAge: 65,
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    time: '9:00 AM',
    visitType: 'Blood Test',
    isUrgent: true,
    status: 'upcoming'
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    patientAge: 78,
    address: '456 Park Avenue, New York, NY 10022',
    time: '11:30 AM',
    visitType: 'X-Ray',
    status: 'upcoming'
  },
  {
    id: '3',
    patientName: 'Robert Johnson',
    patientAge: 72,
    address: '789 Broadway, New York, NY 10003',
    time: '2:15 PM',
    visitType: 'Vitals Check',
    status: 'upcoming'
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/visits">All Visits</Link>
          </Button>
          <Button asChild>
            <Link to="/earnings">View Earnings</Link>
          </Button>
        </div>
      </div>

      {/* Notification alert */}
      <Alert className="border-l-4 border-l-welli-accent bg-welli-background">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          Remember to complete Module 3: Patient Privacy by Friday. 
          <Button asChild variant="link" className="p-0 ml-2">
            <Link to="/learning">Go to Learning Hub</Link>
          </Button>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming visits */}
        <div className="md:col-span-2">
          <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upcoming Visits</h2>
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="today" className="space-y-4 mt-0">
              {visitsData.map(visit => (
                <VisitCard key={visit.id} visit={visit} />
              ))}

              <Button variant="outline" className="w-full" asChild>
                <Link to="/visits" className="flex items-center justify-center gap-1">
                  View All Visits <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </TabsContent>
            
            <TabsContent value="tomorrow" className="mt-0">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <p className="text-welli-textSecondary">No visits scheduled for tomorrow</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="week" className="mt-0">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <p className="text-welli-textSecondary">3 visits scheduled later this week</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Earnings widget */}
        <div>
          <EarningsSummary 
            today={125} 
            thisWeek={675} 
            thisMonth={2850} 
            changePercentage={12.5} 
          />
          
          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Visits Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-welli-textSecondary mt-1">
                  2 completed, 1 remaining
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-welli-textSecondary mt-1">
                  from 27 patient reviews
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Withdrawal shortcut */}
          <Card className="mt-4 bg-gradient-to-r from-welli-main to-welli-accent text-white">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">Available for Withdrawal</h3>
                <p className="text-2xl font-bold mt-1">$1,450</p>
              </div>
              <Button variant="secondary" size="sm" className="whitespace-nowrap" asChild>
                <Link to="/earnings#withdraw">
                  <BadgeDollarSign className="h-4 w-4 mr-1" />
                  Withdraw
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map */}
      <MapView />
    </div>
  );
};

export default Dashboard;
