export function AngleBetweenTwoPointsInPlanXZ(
  p1: { x: number; y: number; z: number },
  ref: { x: number; y: number; z: number }
): number {
  // angle in radians
  //var angleRadians = Math.atan2(p2.x - p1.x,p2.z - p1.z);
  let angle = Math.atan2(p1.x - ref.x, p1.z - ref.z)
  // angle in degrees
  //var angleDeg = Math.atan2(p2.z - p1.z,p2.x - p1.x) * 180 / Math.PI;
  return angle
}
