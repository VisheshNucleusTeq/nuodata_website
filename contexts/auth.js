import { InnerLayout } from "./inner-layout";
export const ProtectRoute = ({ children }) => {

    // return children;

    const authPage = ["Main", "How_it_work", "Sign_in","Sign_up"]; 
    if(authPage.includes(children.type.name)){
        return children;
    }else{
        return (
            <InnerLayout componentName={children.type.name}>
                {children}
            </InnerLayout>
        )
    }
};
