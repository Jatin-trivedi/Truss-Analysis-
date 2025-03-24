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
export const ReactionForce = (Xforces: Forces[], Yforces: Forces[], trussSpan: number) => {
  let Ha = 0;   
  let Ra = 0;
  let Rb = 0;
  Xforces.forEach((force) => {
    if (force.direction === "x") {
      Ha += -force.magnitude;
    }
   
  });
  Yforces.forEach((force) => { 
    if (force.direction === "y") {
    Rb += -(force.magnitude*force.distanceFromZero);
  }
    if (force.direction === "y") {
      Ra += -force.magnitude;
    }});
    Rb = 10*Rb/trussSpan;
    Ra = Ra - Rb;
    const reaction: Reaction = { Ha: Ha, Ra: Ra, Rb: Rb };
    console.log(Xforces)
    return reaction;
} 