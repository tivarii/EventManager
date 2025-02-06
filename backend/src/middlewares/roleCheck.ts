import { Request, Response, NextFunction } from "express";
import decrypt from "../services/roleCodeService";
import { getCommitteeNickName } from "../services/committeeServices";
import { getEventId } from "../services/eventServices";

// to check if the user is a head or member
export async function roleCheck(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { jwtPayload } = req.body;
  const role = decrypt(jwtPayload.roleCode);
  if (!role) {
    res.status(403).json({ message: "Invalid rolecode!" });
    return;
  }
  if (!(role.includes("Head") || role.includes("Member"))) {
    res.status(403).json({ message: "Access denied!" });
    return;
  }
  req.body.role = role;

  next();
}

// to check if the user is an admin
export async function roleCheckAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { jwtPayload } = req.body;
  console.log("roleCode is " + jwtPayload.roleCode);
  try {
    const role = decrypt(jwtPayload.roleCode);

    if (!role.includes("Head")) {
      res.status(403).json({ message: "Access denied!" });
      return;
    }
    req.body.role = role;

    next();
  }catch(e){
    res.status(502).json({
      e,
      msg:"internal error"
    })
  }
  
}

// to check if the user is a committee member
export async function roleCheckCommittee(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { jwtPayload, token } = req.body;
  const role = decrypt(jwtPayload.roleCode);
  const participant = await getEventId(token as string);
  const committee = await getCommitteeNickName(
    participant?.event.committeeId as number,
  );
  const nickName = committee?.nickName;
  const cName = role.split("_")[0];
  if (
    !((role.includes("Head") || role.includes("Member")) && nickName === cName)
  ) {
    res.status(403).json({ message: "Access denied!" });
    return;
  }
  req.body.role = role;

  next();
}
