import React from 'react';

import HeroBg from '../images/hero-bg.jpg';
import AuthorImage from '../images/news-author-01.jpg';
import NewsImage01 from '../images/news-inner-image.jpg';
import NewsImage02 from '../images/news-inner-image-left.jpg';
import Header from '../partials/Header';
import Cta from '../partials/Cta';

function PrivacyPolicy() {
  return (
    <>
      <section className="relative">
        <div className="relative max-w-6xl mx-auto px-6 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto">
              <article>
                {/* Article header */}
                <header className="mb-14">
                  {/* Title and excerpt */}
                  <div className="text-left">
                    <h1
                      className="h1 font-red-hat-display mb-4"
                      data-aos="fade-down"
                    >
                      Privacy Policy
                    </h1>
                  </div>
                </header>

                {/* Article content */}
                <div
                  className="text-lg text-gray-600 dark:text-gray-400"
                  data-aos="fade-up"
                  data-aos-delay="450"
                >
                  <p className="mb-8">
                    This Privacy Policy ("Policy") sets out the basis which
                    ClimbJios ("we", "us", or "our") may collect, use, disclose
                    or otherwise process personal data of our customers in
                    accordance with the Personal Data Protection Act ("PDPA").
                    This Policy applies to personal data in our possession or
                    under our control, including personal data in the possession
                    of organisations which we have engaged to collect, use,
                    disclose or process personal data for our purposes.
                  </p>

                  <div className="text-left">
                    <h4 className="h4 font-red-hat-display mb-4">
                      Personal Data
                    </h4>
                  </div>
                  <ol className="list-decimal ml-6">
                    <li>
                      As used in this Policy: “customer” means an individual who
                      (a) has contacted us through any means to find out more
                      about any goods or services we provide, or (b) may, or
                      has, entered into a contract with us for the supply of any
                      goods or services by us; and “personal data” means data,
                      whether true or not, about a customer who can be
                      identified: (a) from that data; or (b) from that data and
                      other information to which we have or are likely to have
                      access.
                    </li>
                    <li>
                      Depending on the nature of your interaction with us, some
                      examples of personal data which we may collect from you
                      include name, email address, telephone number, gender and
                      photograph.
                    </li>
                    <li>
                      Other terms used in this Policy shall have the meanings
                      given to them in the PDPA (where the context so permits).
                    </li>
                  </ol>

                  <div className="text-left mt-8">
                    <h4 className="h4 font-red-hat-display mb-4">
                      Collection, Use and Disclosure of Personal Data
                    </h4>
                  </div>
                  <ol className="list-decimal ml-6" start="4">
                    <li>
                      We generally do not collect your personal data unless (a)
                      it is provided to us voluntarily by you directly or via a
                      third party who has been duly authorised by you to
                      disclose your personal data to us (your “authorised
                      representative”) after (i) you (or your authorised
                      representative) have been notified of the purposes for
                      which the data is collected, and (ii) you (or your
                      authorised representative) have provided written consent
                      to the collection and usage of your personal data for
                      those purposes, or (b) collection and use of personal data
                      without consent is permitted or required by the PDPA or
                      other laws. We shall seek your consent before collecting
                      any additional personal data and before using your
                      personal data for a purpose which has not been notified to
                      you (except where permitted or authorised by law).
                    </li>
                    <li>
                      We may collect and use your personal data for any or all
                      of the following purposes:
                      <ol className="list-none">
                        <li>
                          (a) performing obligations in the course of or in
                          connection with our provision of the goods and/or
                          services requested by you;
                        </li>
                        <li>(b) verifying your identity;</li>
                        <li>
                          (c) responding to, handling, and processing queries,
                          requests, applications, complaints, and feedback from
                          you;
                        </li>
                        <li>(d) managing your relationship with us;</li>
                        <li>(e) processing payment or credit transactions;</li>
                        <li>
                          (f) complying with any applicable laws, regulations,
                          codes of practice, guidelines, or rules, or to assist
                          in law enforcement and investigations conducted by any
                          governmental and/or regulatory authority;
                        </li>
                        <li>
                          (g) any other purposes for which you have provided the
                          information;
                        </li>
                        <li>
                          (h) transmitting to any unaffiliated third parties
                          including our third party service providers and
                          agents, and relevant governmental and/or regulatory
                          authorities, whether in Singapore or abroad, for the{' '}
                        </li>
                        (i) aforementioned purposes; and
                        <li>
                          (j) any other incidental business purposes related to
                          or in connection with the above.
                        </li>
                      </ol>
                    </li>
                    <li>
                      We may disclose your personal data:
                      <ol className="list-none">
                        <li>
                          (a) where such disclosure is required for performing
                          obligations in the course of or in connection with our
                          provision of the goods and services requested by you;
                          or
                        </li>
                        <li>
                          (b) to third party service providers, agents and other
                          organisations we have engaged to perform any of the
                          functions with reference to the above mentioned
                          purposes.
                        </li>
                      </ol>
                    </li>
                  </ol>

                  <div className="text-left mt-8">
                    <h4 className="h4 font-red-hat-display mb-4">
                      Withdrawing Your Consent
                    </h4>
                  </div>
                  <ol className="list-decimal ml-6" start="7">
                    <li>
                      The consent that you provide for the collection, use and
                      disclosure of your personal data will remain valid until
                      such time it is being withdrawn by you in writing. You may
                      withdraw consent and request us to stop collecting, using
                      and/or disclosing your personal data for any or all of the
                      purposes listed above by submitting your request in
                      writing or via email to our Data Protection Officer at the
                      contact details provided below.
                    </li>
                    <li>
                      Upon receipt of your written request to withdraw your
                      consent, we may require reasonable time (depending on the
                      complexity of the request and its impact on our
                      relationship with you) for your request to be processed
                      and for us to notify you of the consequences of us
                      acceding to the same, including any legal consequences
                      which may affect your rights and liabilities to us. In
                      general, we shall seek to process your request within five
                      (5) business days of receiving it.
                    </li>
                    <li>
                      Whilst we respect your decision to withdraw your consent,
                      please note that depending on the nature and scope of your
                      request, we may not be in a position to continue providing
                      our goods or services to you and we shall, in such
                      circumstances, notify you before completing the processing
                      of your request. Should you decide to cancel your
                      withdrawal of consent, please inform us in writing in the
                      manner described in clause 7 above.
                    </li>
                    <li>
                      Please note that withdrawing consent does not affect our
                      right to continue to collect, use and disclose personal
                      data where such collection, use and disclose without
                      consent is permitted or required under applicable laws.
                    </li>
                  </ol>

                  <div className="text-left mt-8">
                    <h4 className="h4 font-red-hat-display mb-4">
                      Access To And Correction Of Personal Data
                    </h4>
                  </div>
                  <ol className="list-decimal ml-6" start="11">
                    <li>
                      If you wish to make (a) an access request for access to a
                      copy of the personal data which we hold about you or
                      information about the ways in which we use or disclose
                      your personal data, or (b) a correction request to correct
                      or update any of your personal data which we hold about
                      you, you may submit your request in writing or via email
                      to our Data Protection Officer at the contact details
                      provided below.
                    </li>
                    <li>
                      Please note that a reasonable fee may be charged for an
                      access request. If so, we will inform you of the fee
                      before processing your request.
                    </li>
                    <li>
                      We will respond to your request as soon as reasonably
                      possible. In general, our response will be within five (5)
                      business days. Should we not be able to respond to your
                      request within thirty (30) days after receiving your
                      request, we will inform you in writing within thirty (30)
                      days of the time by which we will be able to respond to
                      your request. If we are unable to provide you with any
                      personal data or to make a correction requested by you, we
                      shall generally inform you of the reasons why we are
                      unable to do so (except where we are not required to do so
                      under the PDPA).
                    </li>
                  </ol>

                  <div className="text-left mt-8">
                    <h4 className="h4 font-red-hat-display mb-4">
                      Protection Of Personal Data
                    </h4>
                  </div>
                  <ol className="list-decimal ml-6" start="14">
                    <li>
                      To safeguard your personal data from unauthorised access,
                      collection, use, disclosure, copying, modification,
                      disposal or similar risks, we have introduced appropriate
                      administrative, physical and technical measures such as
                      minimised collection of personal data, authentication and
                      access controls (such as good password practices,
                      need-to-basis for data disclosure, etc.), encryption of
                      data, regular patching of operating system and other
                      software, securely erase storage media in devices before
                      disposal, web security measures against risks, and
                      security review and testing performed regularly.
                    </li>
                    <li>
                      You should be aware, however, that no method of
                      transmission over the Internet or method of electronic
                      storage is completely secure. While security cannot be
                      guaranteed, we strive to protect the security of your
                      information and are constantly reviewing and enhancing our
                      information security measures.
                    </li>
                  </ol>

                  <div className="text-left mt-8">
                    <h4 className="h4 font-red-hat-display mb-4">
                      Accuracy Of Personal Data
                    </h4>
                  </div>
                  <ol className="list-decimal ml-6" start="16">
                    <li>
                      We generally rely on personal data provided by you (or
                      your authorised representative). In order to ensure that
                      your personal data is current, complete and accurate,
                      please update us if there are changes to your personal
                      data by informing our Data Protection Officer in writing
                      or via email at the contact details provided below.
                    </li>
                  </ol>

                  <div className="text-left mt-8">
                    <h4 className="h4 font-red-hat-display mb-4">
                      Retention Of Personal Data
                    </h4>
                  </div>
                  <ol className="list-decimal ml-6" start="17">
                    <li>
                      We may retain your personal data for as long as it is
                      necessary to fulfil the purpose for which it was
                      collected, or as required or permitted by applicable laws.
                    </li>
                    <li>
                      We will cease to retain your personal data, or remove the
                      means by which the data can be associated with you, as
                      soon as it is reasonable to assume that such retention no
                      longer serves the purpose for which the personal data was
                      collected, and is no longer necessary for legal or
                      business purposes.
                    </li>
                  </ol>

                  <div className="text-left mt-8">
                    <h4 className="h4 font-red-hat-display mb-4">
                      Transfers Of Personal Data Outside Of Singapore
                    </h4>
                  </div>
                  <ol className="list-decimal ml-6" start="19">
                    <li>
                      We generally do not transfer your personal data to
                      countries outside of Singapore. However, if we do so, we
                      will obtain your consent for the transfer to be made and
                      we will take steps to ensure that your personal data
                      continues to receive a standard of protection that is at
                      least comparable to that provided under the PDPA.
                    </li>
                  </ol>

                  <div className="text-left mt-8">
                    <h4 className="h4 font-red-hat-display mb-4">
                      Data Protection Officer
                    </h4>
                  </div>
                  <ol className="list-decimal ml-6" start="20">
                    <li>
                      You may contact our Data Protection Officer if you have
                      any enquiries or feedback on our personal data protection
                      policies and procedures, or if you wish to make any
                      request, in the following manner:
                      <br />
                      Telegram:{' '}
                      <a href="https://t.me/rizhaow">https://t.me/rizhaow</a>
                      <br />
                      Phone: +65 82186566
                      <br />
                      Email: rizhaow@gmail.com
                    </li>
                  </ol>

                  <div className="text-left mt-8">
                    <h4 className="h4 font-red-hat-display mb-4">
                      Effect Of Policy And Changes To Policy
                    </h4>
                  </div>
                  <ol className="list-decimal ml-6" start="21">
                    <li>
                      This Policy applies in conjunction with any other Policys,
                      contractual clauses and consent clauses that apply in
                      relation to the collection, use and disclosure of your
                      personal data by us.
                    </li>
                    <li>
                      We may revise this Policy from time to time without any
                      prior Policy. You may determine if any such revision has
                      taken place by referring to the date on which this Policy
                      was last updated. Your continued use of our services
                      constitutes your acknowledgement and acceptance of such
                      changes.
                    </li>
                  </ol>
                  <p className="mt-4">Effective Date: 14/10/2022</p>
                  <p>Last Updated: 14/10/2022</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicy;
