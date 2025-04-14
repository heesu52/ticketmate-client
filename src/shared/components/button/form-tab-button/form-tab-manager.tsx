import { useState } from 'react';

import FormInput from '@/app/concert/form/_components/form-input';
import { PlusIcon, CloseIcon } from '@/assets/icons';

import FormTapButton from './form-tab-button';
import styles from './form-tab-manager.module.scss';

export default function FormTabManager() {
  const [tabs, setTabs] = useState([1]);
  const [activeTab, setActiveTab] = useState(1);
  const [nextId, setNextId] = useState(2);

  const addNewTab = () => {
    setTabs((prev) => [...prev, nextId]);
    setActiveTab(nextId);
    setNextId((id) => id + 1);
  };

  const removeTab = (id: number) => {
    const newTabs = tabs.filter((tabId) => tabId !== id);
    setTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[0]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tab_container}>
        {tabs.map((tabId) => (
          <FormTapButton
            key={tabId}
            label="회차를 선택해주세요"
            isActive={activeTab === tabId}
            onClick={() => setActiveTab(tabId)}
            rightIcon={
              <div
                className={styles.icon}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tabId);
                }}
              >
                <CloseIcon width={16} height={16} />
              </div>
            }
          />
        ))}

        <FormTapButton
          label="추가하기"
          isActive={false}
          onClick={addNewTab}
          rightIcon={<PlusIcon width={16} height={16} />}
        />
      </div>

      <div>
        {tabs.map((tabId) =>
          activeTab === tabId ? <FormInput key={tabId} /> : null,
        )}
      </div>
    </div>
  );
}
