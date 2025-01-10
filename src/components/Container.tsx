import { JobItem } from "../lib/types";
import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

type ContainerProps = {
  jobItems: JobItem[];
};

export default function Container({ jobItems}: ContainerProps) {
  return <div className="container">
    <Sidebar jobItems={jobItems}/>
    <JobItemContent />
  </div>;
}
