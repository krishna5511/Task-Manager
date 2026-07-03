import "./Dashboard.css";

import { useEffect, useState } from "react";

import {
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import StatsCard from "../../components/StatsCard/StatsCard";
import RecentTasks from "../../components/RecentTasks/RecentTasks";
import ProgressCard from "../../components/ProgressCard/ProgressCard";
import Loader from "../../components/Loader/Loader";


import { getDashboard } from "../../services/dashboard.api";
import { useAuth } from "../../context/AuthContext";

import { toast } from "react-toastify";

const Dashboard = () => {

  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    highPriorityTasks: 0,
  });

  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      setLoading(true);

      const data = await getDashboard();

      setStats(data.stats);

      setRecentTasks(data.recentTasks);

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to load dashboard"
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <Loader />;

  }

  return (
    <div className="dashboard">

      <div className="dashboardHeader">

        <div>

          <h1>Dashboard</h1>

          <p>
            Welcome back,
            {" "}
            {user?.name} 👋
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="statsGrid">

        <StatsCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={<FaTasks />}
          color="#4F46E5"
        />

        <StatsCard
          title="Pending"
          value={stats.pendingTasks}
          icon={<FaClock />}
          color="#F59E0B"
        />

        <StatsCard
          title="Completed"
          value={stats.completedTasks}
          icon={<FaCheckCircle />}
          color="#22C55E"
        />

        <StatsCard
          title="High Priority"
          value={stats.highPriorityTasks}
          icon={<FaExclamationTriangle />}
          color="#EF4444"
        />

      </div>

      {/* Bottom */}

      <div className="dashboardBottom">

        <div className="recentSection">

          <RecentTasks
            tasks={recentTasks}
          />

        </div>

        <div className="progressSection">

          <ProgressCard

            totalTasks={stats.totalTasks}

            completedTasks={stats.completedTasks}

            pendingTasks={stats.pendingTasks}

            highPriority={stats.highPriorityTasks}

          />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;