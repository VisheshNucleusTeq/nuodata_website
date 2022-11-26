import { InnerLayout } from "./inner-layout";

export const ProtectRoute = ({ children }) => {
    const fruits = ["Main", "How_it_work", "Sign_in","Sign_up"];
    if(fruits.includes(children.type.name)){
        return children;
    }else{
        return (
            <InnerLayout componentName={children.type.name}>
                {children}
            </InnerLayout>
        )
    }
};
