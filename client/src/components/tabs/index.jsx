import { Flex, Icon } from "@chakra-ui/react"
import { cloneElement } from "react"

const TabItem = ({
    icon, name, active, onChange
}) => {
    return (
        <Flex onClick={() => onChange(name)} className={active == name ? 'yuugen-tabs-tab yuugen-tabs-tab-active' : 'yuugen-tabs-tab'}>
            <Icon w={'24px'} h={'24px'} as={icon} />
            <span>{name}</span>
        </Flex>
    )
}

const Tabs = ({
    children, active, onChange
}) => {
    return (
        <Flex className="yuugen-tabs" >
            <Flex className="yuugen-tabs-list">
                {children.map(child => 
                    cloneElement(child, {active, onChange})
                )}
            </Flex>
        </Flex>
    )
}

export { Tabs, TabItem };