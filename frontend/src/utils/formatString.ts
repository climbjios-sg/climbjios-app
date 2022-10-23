export function formatHeightReach(height: number, reach: number) {
  return `${height}cm (Height) | +${reach}cm (Reach)`;
}

export function formatHighestBoulderingGrade(highestBoulderingGrade: string) {
  return `Bouldering ${highestBoulderingGrade}`;
}

export function formatHighestLeadAndTopRopeGrade(highestLeadClimbingGrade: string, highestTopRopeGrade: string) {
  return `Lead ${highestLeadClimbingGrade} | Top Rope ${highestTopRopeGrade}`;
}

export function formatSncsCertification(sncsCertification: string) {
  return `SNCS ${sncsCertification}`;
}