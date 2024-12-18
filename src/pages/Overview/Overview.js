import React from "react";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";
import { useQuery } from "react-query";
import "./Overview.css";
import {
  fetchData,
  countNodeStatus,
  countPodStatus,
  confirm,
  serviceList,
} from "../Utils";

// Swagger UI : /swagger/index.html
export const Overview = () => {
  // 컴포넌트 마운트 시 데이터 fetch
  // useQuery로 API 호출 및 상태 관리
  const {
    data: nodes,
    isLoading: loadingNodes,
    error: errorNodes,
  } = useQuery("nodes", () => fetchData("http://localhost:8080/v1/nodes"));

  const {
    data: pods,
    isLoading: loadingPods,
    error: errorPods,
  } = useQuery("pods", () => fetchData("http://localhost:8080/v1/pods"));

  const {
    data: events,
    isLoading: loadingEvents,
    error: errorEvents,
  } = useQuery("events", () => fetchData("http://localhost:8080/v1/events"));

  const {
    data: services,
    isLoading: loadingServices,
    error: errorServices,
  } = useQuery("services", () =>
    fetchData("http://localhost:8080/v1/services")
  );

  confirm(loadingServices, errorServices);
  confirm(loadingNodes, errorNodes);
  confirm(loadingPods, errorPods);
  confirm(loadingEvents, errorEvents);

  const nodeStatus = countNodeStatus(nodes);
  const podStatus = countPodStatus(pods);
  const serviceCount = serviceList(services);

  return (
    <div className="d-flex E">
      <div>
        <Sidebar />
      </div>
      <div className="main-content">
        <Navbar />
        <div className="event-content">
          <div className="event-header">
            <h2>Overview</h2>
            <p>Kubernetes Cluster Overview</p>
          </div>
        </div>

        <div className="content-section">
          <div className="card-container">
            {/* backend와 통신할 때 이런식으로 */}
            <StatusCard title="Nodes" statuses={nodeStatus} />
            <StatusCard title="Pods" statuses={podStatus} />
            <ServiceCard title="Services" services={services} />
            <StatusCard title="Daemonsets" statuses={podStatus} />
          </div>
          <div className="card-container">
            {/* backend와 통신할 때 이런식으로 */}
            <StatusCard title="PersistentVolumes" statuses={nodeStatus} />
            <StatusCard title="PersistentVolumeClaims" statuses={podStatus} />
            <StatusCard title="StorageClasses" statuses={podStatus} />
            <StatusCard title="StatefulSets" statuses={podStatus} />
          </div>

          <div className="card-container">
            <StatusCard title="Ingresses" statuses={nodeStatus} />
            <StatusCard title="Job/Cronjob" statuses={podStatus} />
            <EventCard events={events || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

// 컴포넌트
const StatusCard = ({ title, statuses }) => (
  <div className="status-card">
    <h4>{title}</h4>
    {statuses.map((status, index) => (
      <p key={index}>{status}</p>
    ))}
  </div>
);

const ServiceCard = ({ title, services = [] }) => (
  <div className="status-card">
    <h4>{title}</h4>
    <p>Total: {services.length}</p>
    <ul>
      {services.map((service, index) => (
        <li key={index}>{service.name}</li>
      ))}
    </ul>
  </div>
);

const EventCard = ({ events }) => (
  <div className="event-card">
    <h4>Events</h4>
    {events && events.length > 0 ? (
      events.map((event, index) => (
        <p key={index} className="event-warning">
          [{event.namespace}] {event.reason}: {event.message || "No message"}
        </p>
      ))
    ) : (
      <p>No events available.</p>
    )}
  </div>
);

export default Overview;
