import Layout from "../../components/Layout";
import "./LegalPages.css";
import ToTopBtn from "../../components/Buttons/ToTopButton";

const PrivacyPolicyPage = () => {
  return (
    <Layout className='privacy-container' header footer>
      <h1 className='title'>RMIT Privacy Statement</h1>
      <h2>
        RMIT values the privacy of every individual and is committed to the
        responsible handling of personal information.
      </h2>

      <p>
        This Privacy Statement explains what personal information we gather and
        details how that information is used.
      </p>

      <h3>Types of personal information:</h3>
      <ul>
        <li>
          Personal information: Recorded information or data about an
          identifiable or easily identifiable individual
        </li>
        <li>
          Sensitive information: Personal information about an individual's race
          or ethnicity, political opinions, religious or philosophical beliefs,
          sexual orientation or practices, criminal record, or memberships
          details, such as trade union or professional, political or trade
          associations, genetic data and biometric data.
        </li>
        <li>
          Health information: Information about an individual's physical, mental
          or psychological health.
        </li>
      </ul>

      <h2>1. Information we collect</h2>

      <p>
        RMIT only collects information about you by lawful and fair means and in
        a non-intrusive way. RMIT collects personal, sensitive and health
        information as necessary for its core functions, including for
        educational, research, community and commercial purposes. We may collect
        personal information from:
      </p>

      <ul>
        <li>prospective and current students</li>
        <li>staff, including job applicants, as well as contractors</li>
        <li>alumni and donors</li>
        <li>research participants</li>
        <li>industry partners</li>
        <li>RMIT club and gym members</li>
        <li>staff, employees and volunteers from other organisations</li>
        <li>other members of the public who interact with us.</li>
      </ul>

      <p>
        The information we collect depends on how you interact with us and the
        purpose of that interaction. RMIT may collect sensitive information,
        including health information, in certain limited circumstances and for a
        specific purpose. RMIT also uses specific collection statements in
        connection with your engagement with us, such as the Staff Privacy
        Statement and the Student Privacy Statement.
      </p>

      <p>
        When appropriate we provide a detailed privacy collection statement to
        you capturing the personal and heath information is collected and
        stating that RMIT provides your personal information to and for what
        purpose or as soon as practicable thereafter.
      </p>

      <p>
        Your personal information is usually collected directly from you. In
        some cases, we may collect information from a third party, such as a
        government authority, agency, contractor, or other educational or
        research institutions. Where personal information is provided to us by a
        person other than you, it will be deleted or de-identified if not
        required, or you will receive a notice of its collection, its use and
        your rights as a data subject.
      </p>

      <p>
        Where practicable, you may choose to remain anonymous when interacting
        with RMIT. However, remaining anonymous may affect your ability to
        access some RMIT services and systems. RMIT will let you know when this
        may affect your engagement with us.
      </p>

      <h2>2. How we use your information</h2>

      <p>
        RMIT uses personal including sensitive and health information to deliver
        our core functions, and comply with our obligations with respect to the
        provision of education and research. We use your information for the
        primary purpose for which it was collected, a related secondary purpose
        that you may reasonably expect (with the exception of sensitive or
        health information), as required by law, or with your permission or
        consent.
      </p>

      <p>
        The laws in some jurisdictions require us to tell you about the legal
        ground we rely on to use or share your personal information. These legal
        grounds may include, but are not limited to, meeting our contractual
        commitments to you, for a legitimate interest, to comply with law, or to
        perform a public task. We will always consider your rights when using
        your personal information.
      </p>

      <p>We may use and process your information for: </p>

      <ul>
        <li>
          Education and education support: admission, enrolment, content
          delivery and learning activities, assessment, graduation, services
          (e.g. library, wellbeing, support), mentoring, handling disputes,
          investigations, audits, data analysis and improvements, general
          administration and enquiry management.
        </li>
        <li>
          Research and research support: including participant data,
          administration and commercialisation.{" "}
        </li>
        <li>
          Community and industry engagement: website operation, addressing
          enquiries and requests, marketing, customer relations, mailing lists
          and newsletters, event invitations, alumni and donor relations.
        </li>
        <li>
          Employment and employee support: recruitment (including referees),
          payroll, health and safety, learning and development for staff and
          other Human Resources programs, contractors and volunteers.{" "}
        </li>
        <li>
          Operational management and finances: financial management, processing
          fees, IT security and management, data analysis, legal and
          professional services, analysing and improving our courses,
          educational opportunities, business and services.
        </li>
        <li>
          Infrastructure and facilities: access and management systems, CCTV,
          identity management, security and emergency response, including to
          lessen or prevent threats to safety.
        </li>
        <li>
          Transacting between RMIT entities to deliver and improve our services.
        </li>
        <li>
          For a secondary purpose or where otherwise permitted by law, such as
          the provision of information to government departments or agencies.
        </li>
      </ul>

      <h2>3. How we store and protect your information</h2>

      <p>
        RMIT applies safeguards and takes appropriate security measures to
        protect your personal information from misuse, loss, unauthorised access
        and disclosure.
      </p>

      <p>
        Stored information is also archived in accordance with the Public
        Records Act 1973 (Vic), which determines when information should be
        retained or disposed. Reasonable steps are taken to destroy or
        permanently de-identify your personal information when it is no longer
        needed for any purpose.
      </p>

      <p>
        Personal information may be stored in hard copy documents, as electronic
        data, or in RMIT software or systems, including cloud or other types of
        network or electronic storage. Some of the ways RMIT seeks to protect
        personal information include:
      </p>

      <ul>
        <li>Privacy processes and the protection of information;</li>
        <li>Document storage and data security processes;</li>
        <li>Security measures for access to RMIT systems and networks;</li>
        <li>Controlling access to RMIT premises; and</li>
        <li>Website protection measures.</li>
      </ul>

      <p>
        Where it is necessary to share your personal information with a
        contracted service provider or third-party, RMIT takes reasonable steps
        to ensure that there are appropriate safeguards, such as, legally
        binding and enforceable instrument, in place to protect your personal
        information.
      </p>

      <p>
        RMIT operates in Australia and overseas, including Spain and Vietnam.
        Accordingly, we may need to share some of your information we collect
        about you between RMIT entities in these jurisdictions. For example,
        this could include the transfer of your information from an EEA country
        to Australia, and vice-versa.
      </p>
      <ToTopBtn />
    </Layout>
  );
};

export default PrivacyPolicyPage;
