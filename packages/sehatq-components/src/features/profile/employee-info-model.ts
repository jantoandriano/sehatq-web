export interface EmployeeInfoResponse {
  data: {
    user: {
      id: number;
      sehatqUserId: number;
      name: string;
      memberId: string;
      gender: string;
      dob: string;
      email: string;
      identityNumber: string;
      phone: string;
      plan: {
        id: number;
        code: string;
        name: string;
      };
    };
    employee: {
      employeeNumber: string;
      email: string;
      position: string | null;
    };
    company: {
      name: string;
      imageUrl: string;
      tncUrl: string;
      benefitUrl: string;
      allowFreeChat: boolean;
    };
  };
}

export function ModelEmployeeInfo(data: EmployeeInfoResponse["data"]) {
  return {
    userId: data?.user?.sehatqUserId,
    employeeNumber: data?.employee?.employeeNumber,
    allowFreeChat: data?.company?.allowFreeChat,
  };
}

export type EmployeeInfo = ReturnType<typeof ModelEmployeeInfo>;
