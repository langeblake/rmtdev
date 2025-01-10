export type JobItem = {
    id: number;
    badgeLetters: string;
    title: string;
    company: string;
    daysAgo: number;
    relevanceScore: number;
  };

  export type JobItemExpanded = JobItem & {
    description: string;
    qualifications: string[];
    reviews: string[];
    duration: string;
    salary: string;
    location: string;
    coverImageURL: string;
    companyURL: string;
  };

  export type SortBy = "relevant" | "recent";

  export type PageDirection = "next" | "prev";