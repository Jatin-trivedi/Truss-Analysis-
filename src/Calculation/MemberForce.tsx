interface Node {
  x: number;
  y: number;
  label: string;
}

interface Member {
  start: number;
  end: number;
}

interface Force {
  node: number;
  fx: number;
  fy: number;
}

interface Reaction {
  Ha: number;
  Ra: number;
  Rb: number;
}

interface MemberForce {
  force: number;
}
export interface ComputedForces {
  node: number;
  forceX: number;
  forceY: number;
  type: string;
}
const calculateMemberForces = (
  computedForces: Map<number, ComputedForces>,
  trussSpan: number,
  trussHeight: number,
  reactions: Reaction
): Map<string, number> => {
 
  let CalcForces = new Map<string, number>();
  ComputeForces(computedForces.get(0)!, CalcForces, trussHeight, trussSpan, reactions)
  ComputeForces(computedForces.get(2)!, CalcForces, trussHeight, trussSpan, reactions)
  ComputeForces(computedForces.get(1)!, CalcForces, trussHeight, trussSpan, reactions)
  ComputeForces(computedForces.get(4)!, CalcForces, trussHeight, trussSpan, reactions)
  ComputeForces(computedForces.get(3)!, CalcForces, trussHeight, trussSpan, reactions)
  ComputeForces(computedForces.get(6)!, CalcForces, trussHeight, trussSpan, reactions)
  ComputeForces(computedForces.get(7)!, CalcForces, trussHeight, trussSpan, reactions)

  return CalcForces;
};
const ComputeForces = (
  force: ComputedForces,
  CalcForces: Map<string, number>,
  trussHeight: number,
  trussSpan: number,
  reactions: Reaction
) => {
  const hypotenuse = Math.sqrt((trussHeight/10) ** 2 + (trussSpan / 40) ** 2);
    const cos = (trussSpan / 40) / hypotenuse;
    const sin = (trussHeight/10) / hypotenuse;
    console.log("sin",sin)
    console.log(cos)
    console.log(hypotenuse)
    console.log(force.node)

  if (force.node === 0) {
    const F01 = (-force.forceY - reactions.Ra) / sin;
    const F02 = -reactions.Ha - force.forceX - F01 * cos;
    console.log(F01);
    console.log(F02);
    CalcForces.set("F01", F01);
    CalcForces.set("F02", F02);
  } else if (force.node === 2) {
    const F12 = -force.forceY;
    const F23 = -force.forceX + CalcForces.get("F02")!;
    CalcForces.set("F12", F12);
    CalcForces.set("F23", F23);
  } else if(force.node === 1){
    const F13 = (-CalcForces.get("F01")!*sin + force.forceY - CalcForces.get("F12")!)/sin;
    const F14 = CalcForces.get("F01")!*cos - force.forceX - F13*cos;
    CalcForces.set("F13", F13);
    CalcForces.set("F14", F14);
  }
    else if(force.node === 4){
      const F34 =  force.forceY;
      const F45 = CalcForces.get("F14")! - force.forceX ;
      CalcForces.set("F34", F34);
      CalcForces.set("F45", F45);
    }
    else if(force.node === 3){
      const F35 = (-CalcForces.get("F34")! - force.forceY -CalcForces.get("F13")!*sin)/sin;
      const F36 = CalcForces.get("F23")! + CalcForces.get("F13")!*cos - force.forceX - F35*cos;
      CalcForces.set("F35", F35);
      CalcForces.set("F36", F36);
    }
    else if(force.node === 6){
      const F56 = - force.forceY;
      const F67 = CalcForces.get("F36")!- force.forceX;
      CalcForces.set("F56", F56);
      CalcForces.set("F67", F67);
    }
    else if(force.node === 7){
      const F57 = (- force.forceY - reactions.Rb)/sin;
      
      CalcForces.set("F57", F57);
      
    }
    console.log(CalcForces)
  }
;

export default calculateMemberForces;
 