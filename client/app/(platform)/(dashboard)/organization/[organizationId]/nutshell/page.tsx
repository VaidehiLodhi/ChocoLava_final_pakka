import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info"
import { FlaskRequester } from "./_components/flask_requester";
import { AuditFetcher } from "./_components/audit_fetcher";

const NutshellPage =()=> {
    return (
      <div className="w-full">
        <Info />
        <Separator className="my-2" />
        <FlaskRequester/>
        <AuditFetcher/>
      </div>
    );
}

export default NutshellPage;