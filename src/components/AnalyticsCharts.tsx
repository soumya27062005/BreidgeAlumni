import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Calendar, Heart, GraduationCap } from "lucide-react";

const AnalyticsCharts = () => {
  const engagementData = [
    { month: 'Jan', alumni: 450, students: 320, events: 12 },
    { month: 'Feb', alumni: 520, students: 380, events: 15 },
    { month: 'Mar', alumni: 600, students: 420, events: 18 },
    { month: 'Apr', alumni: 680, students: 480, events: 22 },
    { month: 'May', alumni: 750, students: 540, events: 25 },
    { month: 'Jun', alumni: 820, students: 600, events: 28 }
  ];

  const departmentData = [
    { name: 'Computer Science', value: 35, count: 420 },
    { name: 'Engineering', value: 28, count: 336 },
    { name: 'Business', value: 20, count: 240 },
    { name: 'Medicine', value: 10, count: 120 },
    { name: 'Arts & Sciences', value: 7, count: 84 }
  ];

  const donationData = [
    { month: 'Jan', amount: 15000, donors: 45 },
    { month: 'Feb', amount: 18000, donors: 52 },
    { month: 'Mar', amount: 22000, donors: 64 },
    { month: 'Apr', amount: 25000, donors: 71 },
    { month: 'May', amount: 28000, donors: 78 },
    { month: 'Jun', amount: 32000, donors: 85 }
  ];

  const mentorshipData = [
    { week: 'Week 1', sessions: 25, requests: 32 },
    { week: 'Week 2', sessions: 30, requests: 28 },
    { week: 'Week 3', sessions: 35, requests: 40 },
    { week: 'Week 4', sessions: 28, requests: 35 }
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--success))', 'hsl(var(--muted))'];

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Total Alumni", value: "12,500", change: "+8.2%", icon: Users, color: "primary" },
          { title: "Active Students", value: "3,200", change: "+12.5%", icon: GraduationCap, color: "accent" },
          { title: "Events This Month", value: "28", change: "+15.0%", icon: Calendar, color: "secondary" },
          { title: "Total Donations", value: "$1.2M", change: "+22.1%", icon: Heart, color: "success" }
        ].map((metric, index) => (
          <Card key={index} className="shadow-custom-md hover:shadow-custom-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">{metric.change}</span>
                  </div>
                </div>
                <metric.icon className={`w-8 h-8 ${
                  metric.color === 'primary' ? 'text-primary' :
                  metric.color === 'accent' ? 'text-accent' :
                  metric.color === 'secondary' ? 'text-secondary' : 'text-success'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends */}
        <Card className="shadow-custom-lg">
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
            <CardDescription>Monthly active users and events</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="alumni" 
                  stackId="1" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.6}
                  name="Alumni"
                />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stackId="1" 
                  stroke="hsl(var(--accent))" 
                  fill="hsl(var(--accent))" 
                  fillOpacity={0.6}
                  name="Students"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="shadow-custom-lg">
          <CardHeader>
            <CardTitle>Alumni by Department</CardTitle>
            <CardDescription>Distribution across academic departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Donation Trends */}
        <Card className="shadow-custom-lg">
          <CardHeader>
            <CardTitle>Donation Trends</CardTitle>
            <CardDescription>Monthly donation amounts and donor count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="amount" 
                  fill="hsl(var(--success))" 
                  fillOpacity={0.8}
                  name="Donation Amount ($)"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="donors" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Number of Donors"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mentorship Activity */}
        <Card className="shadow-custom-lg">
          <CardHeader>
            <CardTitle>Mentorship Activity</CardTitle>
            <CardDescription>Weekly mentorship sessions and requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mentorshipData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="sessions" 
                  fill="hsl(var(--primary))" 
                  name="Sessions Completed"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="requests" 
                  fill="hsl(var(--accent))" 
                  name="New Requests"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
