export interface MemberForces{
    trussSpan: number;
    trussHeight: number;
    direction: string;
    magnitude: number;
    Ha: number;
    Ra: number;
    Rb: number;

}
   export interface Member{
    direction: string;
    MemberName: string;
    MemberValue: number;
    cos: number;
    sin: number;
    hypotenuse: number;
    F01: number;
    F02: number;
    F12: number;
    F13: number;
    F14: number;
    F23: number;
    F34: number;
    F35: number;
    F36: number;
    F45: number;
    F56: number;
    F57: number;
    F67: number;
   }

export const MemberForces = (member: Member[], trussSpan: number, trussHeight: number, Ha: number, Ra: number, Rb: number) => {
    let cos = 0;
    let sin = 0;
    let hypotenuse = 0;
    let F01 = 0;
    let F02 = 0;
    let F12 = 0;
    let F13 = 0;
    let F14 = 0;
    let F23 = 0;
    let F34 = 0;
    let F35 = 0;
    let F36 = 0;
    let F45 = 0;
    let F56 = 0;
    let F57 = 0;
    let F67 = 0;
    member.forEach((member) => {
        if(member.direction === "x"){
            F01 += -Ra/sin;
            F02 += -Ha - member.F01*cos;
        }
        if(member.direction === "y"){
            F02 += -Ha - member.F01*cos;
        }
    })

    hypotenuse = Math.sqrt(trussSpan*trussSpan/16 + trussHeight*trussHeight);
    cos = trussSpan/(hypotenuse*4);
    sin = trussHeight/hypotenuse;
    console.log(cos)
    console.log(sin)
    
    F01 = -Ra/sin;
    F02 = -Ha - F01*cos;
    
}

