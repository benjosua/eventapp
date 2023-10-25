import React from "react";
import { Button } from "payload/components/elements";
import { Select } from "payload/components/forms";

const baseClass = "after-dashboard";

const AfterDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <section>
        <h2>Police event registration</h2>
        <Select
          name="selectedItems"
          label="Select events"
          hasMany
          options={[
            { label: "Event 1", value: "Event 2" },
            { label: "Event 2", value: "item2" },
            { label: "Event 3", value: "item3" },
          ]}
        />
        <Button>Create Email Template (Coming soon)</Button>
      </section>
    </div>
  );
};

export default AfterDashboard;
