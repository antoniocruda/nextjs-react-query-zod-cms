import { AdminRolePermissionExtended } from '@/frontend-api/AdminRoleApiTypes';
import MinusIcon from '@/icons/MinusIcon';
import PlusIcon from '@/icons/PlusIcon';
import CheckboxInput from './CheckboxInput';
import { changeCheckboxInputOfChildren } from './hooks/util';

type Props = {
    permission: AdminRolePermissionExtended;
    expandState: Record<string, boolean>;
    setExpandState: (state: Record<string, boolean>) => void;
    checkedState: Record<string, boolean>;
    setCheckedState: (state: Record<string, boolean>) => void;
};

export default function PermissionTreeItem({
    permission,
    expandState,
    setExpandState,
    checkedState,
    setCheckedState
}: Props) {
    function onChangeCheckboxInput(key: string, isChecked: boolean) {
        const copyCheckedState = { ...checkedState };
        copyCheckedState[key] = isChecked;

        const idx = permission.permissions.findIndex(p => (copyCheckedState[`${permission.page}.${p.key}`] === true));
        copyCheckedState[permission.page] = (idx >= 0);

        setCheckedState(copyCheckedState);
    }
    

    function onChangeCheckboxInputAndChildren(key: string, isChecked: boolean, permission: AdminRolePermissionExtended) {
        const copyCheckedState = { ...checkedState };

        changeCheckboxInputOfChildren(permission, isChecked, copyCheckedState);
        setCheckedState(copyCheckedState);
    }

    function toggleExpandState(key: string) {
        const copyExpandState = { ...expandState };
        copyExpandState[key] = !copyExpandState[key];

        setExpandState(copyExpandState);
    }

    return (
        <div
            key={permission.page}
        >
            <div className="flex items-center">
                <button
                    className="text-md mr-2 rounded-sm border-[1px] border-black border-solid flex items-center justify-center w-4 h-4"
                    onClick={() => toggleExpandState(permission.page)}
                    type="button"
                >
                    {
                        (expandState[permission.page])
                        ? <MinusIcon className="w-3 h-3"/>
                        : <PlusIcon className="w-3 h-3"/>
                    }
                </button>
                
                <CheckboxInput
                    onChange={(val) => onChangeCheckboxInputAndChildren(permission.page, val, permission)}
                    label={permission.label}
                    isChecked={checkedState[permission.page] || false}
                />
            </div>

            <div
                className={expandState[permission.page] ? 'ml-10 visible' : 'hidden'}
            >
                {permission.permissions.map((p) => (
                    <div
                        className="flex gap-1"
                        key={`${permission.page}_${p.key}`}
                    >
                        <CheckboxInput
                            onChange={(val) => onChangeCheckboxInput(`${permission.page}.${p.key}`, val)}
                            label={p.label}
                            isChecked={checkedState[`${permission.page}.${p.key}`] || false}
                        />
                    </div>
                ))}

                {permission.children.map(child => (
                    <PermissionTreeItem
                        key={`${permission.page}-${child.page}`}
                        permission={child}
                        expandState={expandState}
                        setExpandState={setExpandState}
                        checkedState={checkedState}
                        setCheckedState={setCheckedState}
                    />
                ))}
            </div>
        </div>
    );
}