import React from 'react';

export interface Tab {
    label: string;
    key: string;
    icon?: (props: IconTypeProps) => JSX.Element;
};

interface IconTypeProps {
    className: string;
}

type Props =  {
    tabs: Tab[];
    activeTab: string;
    onChangeTab: (tab: Tab) => void;
    children: React.ReactNode;
    childrenClassName?: string;
    tabClassName?: string;
};

const Tabs = ({
    tabs,
    activeTab,
    onChangeTab,
    children,
    childrenClassName = '',
    tabClassName = ''
}: Props) => {
    return (
        <>
            <div className="border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-400">
                    {tabs.map((tab) => (
                        <li className="mr-1" key={tab.key}>
                            <button
                                type="button"
                                className={`
                                    inline-flex py-3 px-2 rounded-t-lg uppercase font-Montserrat-Bold
                                    ${(activeTab === tab.key) ? 'text-black border-b-2 border-red-100 active' : 'text-gray-50 hover:text-gray-500 hover:border-gray-200'}
                                    ${tabClassName}
                                `}
                                onClick={() => onChangeTab(tab)}
                            >
                                {(tab.icon) && (
                                    <>
                                        {React.createElement(tab.icon, { className: `w-5 h-5 mr-2` })}
                                    </>
                                )}
                                
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`border-t p-4 ${childrenClassName}`}>
                { children }
            </div>
        </>
    );
};

export default Tabs;