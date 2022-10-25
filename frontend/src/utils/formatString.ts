// Join strings with seprator if string is not empty string
export function joinNonemptyStrs(arr: string[], seprator: string): string {
  return arr.filter((str) => str !== '').join(seprator);
}

function formatReach(reach: number) {
  if (reach >= 0) {
    return `+${reach}`;
  }

  return reach;
}

export function formatHeightReach(height?: number, reach?: number) {
  const heightText = height !== undefined ? `${height}cm (Height)` : '';
  const reachText = reach !== undefined ? `${formatReach(reach)}cm (Reach)` : '';

  return joinNonemptyStrs([heightText, reachText], ' · ');
}

export function formatHighestBoulderingGrade(highestBoulderingGrade: string) {
  return `Bouldering ${highestBoulderingGrade}`;
}

export function formatHighestLeadAndTopRopeGrade(
  highestLeadClimbingGrade?: string,
  highestTopRopeGrade?: string
) {
  const leadText = highestLeadClimbingGrade !== undefined ? `Lead ${highestLeadClimbingGrade}` : '';
  const topRopeText = highestTopRopeGrade !== undefined ? `Top Rope ${highestTopRopeGrade}` : '';

  return joinNonemptyStrs([leadText, topRopeText], ' · ');
}

export function formatSncsCertification(sncsCertification: string) {
  return `SNCS ${sncsCertification}`;
}
