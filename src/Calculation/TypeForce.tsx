// src/Calculation/ForceType.ts

export type ForceType = "Tension" | "Compression";

export interface MemberForceType {
  member: string;
  force: number;
  type: ForceType;
}

export const calculateForceTypes = (memberForces: Map<string, number>): MemberForceType[] => {
  const result: MemberForceType[] = [];
  
  memberForces.forEach((force, member) => {
    // Positive force indicates Compression, negative indicates Tension
    const type: ForceType = force >= 0 ? "Compression" : "Tension";
    result.push({
      member,
      force,
      type
    });
  });
  
  return result.sort((a, b) => a.member.localeCompare(b.member));
};