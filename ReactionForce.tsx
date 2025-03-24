export interface Forces{
    direction: string;
    magnitude: number;
    node: number;
    distanceFromZero: number;

}
export interface  Reaction{
    Ha: number;
    Ra: number;
    Rb: number;
}
export const ReactionForce = (forces: Forces[], trussSpan: number) => {
  let Ha = 0;   
  let Ra = 0;
  let Rb = 0;
  forces.forEach((force) => {
    if (force.direction === "x") {
      Ha += force.magnitude;
    }
    if (force.direction === "y") {
        Rb += (force.magnitude*force.distanceFromZero);
      }
  });
  Rb = -10*Rb/trussSpan;
  console.log(forces)
  forces.forEach((force) => {
    if (force.direction === "y") {
      Ra += -force.magnitude;
    }});
    Ra = Ra - Rb;
    const reaction: Reaction = { Ha: Ha, Ra: Ra, Rb: Rb };
  return reaction;
} 