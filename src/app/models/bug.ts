export interface Bug {
    id: string,
    title: string,
    description: string,
    severity: Severity.Low | Severity.Minor | Severity.Major | Severity.Critical,
    release: string,
    links: string[],
    status?: string,
}

export enum Severity {
    Low = 'Low',
    Minor = 'Minor',
    Major = 'Major',
    Critical = 'Critical'
}